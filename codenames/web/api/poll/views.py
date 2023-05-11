import hashlib
from typing import Optional

from fastapi import APIRouter, Header, Response

from codenames.db.models.game import Player, Cards, GameLog, Game
from codenames.web.api.auth.user import oauth2_scheme

router = APIRouter()


@router.get("/state")
async def get_game_state(room_id: int, if_none_match: Optional[str] = Header(None)):
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

    # If the ETag has changed, generate a new response
    for card in cards:
        if not card['is_revealed']:
            del card['color']  # delete color for cards which are not revealed

    headers = {'ETag': etag}
    return {'card': cards, 'players': players, 'state': state}, headers