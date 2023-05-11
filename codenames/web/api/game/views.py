import pprint
import random
import uuid
from fastapi import APIRouter, Depends, Response, HTTPException
from starlette import status

from codenames.db.models.game import (Game, GameStatus, Teams, Room, Cards, GameLog,
                                      Player)
from codenames.db.models.user import User
from codenames.web.api.auth.user import oauth2_scheme
from codenames.web.api.game.base_types import (GameRoomBody, CreateLog, PlayerTypeIn,
                                               SpymasterResponse)
from codenames.web.api.utils.auth import decode_access_token
from codenames.web.api.utils.game import player_sequence_generator
from codenames.web.api.utils.word_generator import generate_words

router = APIRouter()


@router.get("/all")
async def get_all_rooms():
    queryset = Game.objects.filter(finished=False)
    rooms = await queryset.values_list('room_name', flatten=True)
    return list(rooms)


@router.post("/create")
async def create_game_room(create_game: GameRoomBody, token=Depends(oauth2_scheme)):
    seq_list = [i for i in range(1, 26)]
    default_sequence = random.sample(seq_list, len(seq_list))

    current_user = await User.objects.get(username=decode_access_token(token))
    room = await Room.objects.create(name=create_game.room_name,
                                     share_uuid=str(uuid.uuid4().hex),
                                     is_active=True,
                                     players=[current_user])
    game_room = await Game.objects.create(status=GameStatus.BLUE_SPY_MASTER,
                                          turn=Teams.Blue,
                                          room=room.id,
                                          host=current_user)
    cards = list()
    blue_card_words = generate_words(12)
    red_card_words = generate_words(12)
    for i in range(12):
        cards.append(Cards(room_name=room.id, color=Teams.Blue, text=blue_card_words[i],
                           game=game_room.id, sequence=default_sequence[i]))
    default_sequence = default_sequence[12:]  # remove assigned sequence
    for i in range(12):
        cards.append(Cards(room_name=room.id, color=Teams.Red, text=red_card_words[i],
                           game=game_room.id, sequence=default_sequence[i]))
    default_sequence = default_sequence[12:]  # remove assigned sequence
    cards.append(Cards(room_name=room.id, color=Teams.Black, text=generate_words(1)[0],
                       game=game_room.id, sequence=default_sequence[0]))
    await Cards.objects.bulk_create(cards)
    return {'status': 'success', 'room_id': room.id}


@router.delete("/delete")
async def exit_game(room_name: GameRoomBody,
                    response: Response,
                    token=Depends(oauth2_scheme),
                    ):
    current_user = await User.objects.get(username=decode_access_token(token))
    room = await Room.objects.select_related("games").filter(
        name=room_name.room_name).get()

    # for first game host id
    game_hosted_by: int = room.games[0].host.id
    if game_hosted_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not the host of the room, please contact the host to "
                   "close the room"
        )

    if not room:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": f"room with room name {room_name}, not found."}
    room.is_active = False
    await room.update()
    return room


@router.post("/send_log")
async def create_log(
    log_text: CreateLog,
    token=Depends(oauth2_scheme)
):
    current_user = await User.objects.get(username=decode_access_token(token))
    log = await GameLog.objects.create(
        text=log_text.text,
        identifier=str(uuid.uuid4().hex),
        generated_by=current_user,
        game=log_text.game_id
    )
    return log


@router.get("/reveal_card")
async def reveal_card(
    index: int,
    room_id: int,
    response: Response,
    token=Depends(oauth2_scheme)
):
    current_user = await User.objects.get(username=decode_access_token(token))
    # TODO: add user check, if user is in room
    card = await Cards.objects.get_or_none(sequence=index, room_name=room_id)
    if card:
        card.is_revealed = True
        await card.update()
        return card
    response.status_code = status.HTTP_404_NOT_FOUND

    # log gameplay
    await GameLog(
        text="",
        identifier=str(uuid.uuid4().hex),
        generated_by=current_user,
        card=card.id
    )

    return {'message': 'no matching card found'}


@router.get("/get_all_cards")
async def get_all_cards(
    room_id: int,
    token=Depends(oauth2_scheme)  # TODO: check user
):
    card = await Cards.objects.filter(room_name=room_id).values(
        ['id', 'color', 'sequence', 'is_revealed', 'text']
    )
    for c in card:
        if not c['is_revealed']:
            del c['color']  # delete color for cards which are not revealed
    return card


@router.post("/player_type")
async def player_type(
    player: PlayerTypeIn,
    token=Depends(oauth2_scheme)
):
    current_user = await User.objects.get(username=decode_access_token(token))
    existing_player = await Player.objects.get_or_none(room=player.room_id,
                                               user=current_user.id)
    if existing_player:
        existing_player.spymaster = player.spymaster
        existing_player.operative = player.operative
        existing_player.team_color = player.team_color
        await existing_player.update()
        return existing_player
    else:
        new_player = await Player(
            room=player.room_id,
            spymaster=player.spymaster,
            operative=player.operative,
            team_color=player.team_color,
            user=current_user.id
        ).save()
        return new_player


@router.post("/spymaster_response")
async def get_response_from_spymaster(
    spymaster_resp: SpymasterResponse,
    token=Depends(oauth2_scheme)
):
    current_user = await User.objects.get(username=decode_access_token(token))
    await GameLog(
        game=spymaster_resp.game_id,
        text=spymaster_resp.text,
        identifier=str(uuid.uuid4().hex),
        generated_by=current_user.id
    ).save()
    last_game_action = await Game.objects.filter(room=spymaster_resp.room_id).order_by("-id").limit(1).get()
    next_move = player_sequence_generator(last_game_action.status)
    await Game(
        status=next_move,
        turn=next_move.split(" ")[0].capitalize(),
        room=spymaster_resp.room_id,
        host=current_user.id,
    ).save()


