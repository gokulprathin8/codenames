import uuid
from fastapi import APIRouter, Depends

from codenames.db.models.game import Game, GameStatus, Teams, Room, Cards
from codenames.db.models.user import User
from codenames.web.api.auth.user import oauth2_scheme
from codenames.web.api.game.base_types import CreateGameRoom
from codenames.web.api.utils.auth import decode_access_token
from codenames.web.api.utils.word_generator import generate_words

router = APIRouter()


@router.get("/all")
async def get_all_rooms():
    queryset = Game.objects.filter(finished=False)
    rooms = await queryset.values_list('room_name', flatten=True)
    return list(rooms)


@router.post("/create")
async def create_game_room(create_game: CreateGameRoom, token=Depends(oauth2_scheme)):
    current_user = await User.objects.get(username=decode_access_token(token))
    room = await Room.objects.create(name=create_game.room_name,
                               share_uuid=str(uuid.uuid4().hex),
                               is_active=True,
                               players=[current_user])
    game_room = await Game.objects.create(status=GameStatus.BLUE_SPY_MASTER,
                                    turn=Teams.Blue,
                                    room=room.id)
    cards = list()
    blue_card_words = generate_words(12)
    red_card_words = generate_words(12)
    for i in range(12):
        cards.append(Cards(room_name=room.id, color=Teams.Blue, text=blue_card_words[i],
                           game=game_room.id))
    for i in range(12):
        cards.append(Cards(room_name=room.id, color=Teams.Red, text=red_card_words[i],
                           game=game_room.id))
    cards.append(Cards(room_name=room.id, color=Teams.Black, text=generate_words(1)[0],
                       game=game_room.id))  # for the black card
    await Cards.objects.bulk_create(cards)
    return {'status': 'success'}




