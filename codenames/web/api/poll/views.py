import hashlib
from typing import Optional

from fastapi import APIRouter, Header, Response, Depends

from codenames.db.models.game import Player, Cards, GameLog, Game
from codenames.db.models.user import User
from codenames.web.api.auth.user import oauth2_scheme
from codenames.web.api.utils.auth import decode_access_token

router = APIRouter()


@router.get("/state")
async def get_game_state(room_id: int,
                         if_none_match: Optional[str] = Header(None),
                         token=Depends(oauth2_scheme),
                         spymaster: bool = False):
    current_user = await User.objects.get(username=decode_access_token(token))
    players = await Player.objects.select_related('user').filter(room=room_id).values(
        ['id', 'user__id', 'user__username', 'spymaster', 'operative', 'team_color']
    )
    cards = await Cards.objects.filter(room_name=room_id).values(
        ['id', 'color', 'sequence', 'is_revealed', 'text']
    )
    state = await Game.objects.order_by("-id").filter(room=room_id).all()

    # Generate an ETag based on the current state of the game
    game_state = {'card': cards, 'players': players}
    etag = hashlib.md5(str(game_state).encode('utf-8')).hexdigest()

    # Check if the ETag matches the If-None-Match header
    if if_none_match == etag:
        return Response(status_code=304)

    me = await Player.objects.select_related('user').filter(room=room_id,
                                                            user=current_user.id,
                                                            ).values(
        ['id', 'user__id', 'user__username', 'spymaster', 'operative', 'team_color']
    )

    in_game_log = await GameLog.objects.select_related('game').filter(text__isnull=False,
                                               text__gte=1,
                                               room=room_id).order_by('id').values(
        'text', 'created_at', 'game__turn'
    )

    if not spymaster:
        # If the ETag has changed, generate a new response
        for card in cards:
            if not card['is_revealed']:
                del card['color']  # delete color for cards which are not revealed

    headers = {'ETag': etag}
    return {'card': cards, 'players': players, 'state': state, 'me': me,
            'log': in_game_log}, headers
