import uuid
from fastapi import APIRouter, Depends

from codenames.db.models.game import Game, GameStatus, Teams, Room, Cards
from codenames.db.models.user import User
from codenames.web.api.auth.user import oauth2_scheme
from codenames.web.api.game.base_types import CreateGameRoom
from codenames.web.api.utils.auth import decode_access_token

router = APIRouter()


@router.get("/all")
async def get_all_rooms():
    queryset = Game.objects.filter(finished=False)
    rooms = await queryset.values_list('room_name', flatten=True)
    return list(rooms)


@router.post("/create")
async def create_game_room(create_game: CreateGameRoom, token=Depends(oauth2_scheme)):
    current_user = await User.objects.get(username=decode_access_token(token))
    room = Room.objects.create(name=create_game.room_name,
                               share_uuid=str(uuid.uuid4().hex),
                               is_activ=True,
                               players=[current_user])
    game_room = Game.objects.create(status=GameStatus.BLUE_SPY_MASTER,
                                    turn=Teams.Blue,
                                    room=room)
    

