from fastapi import APIRouter

from codenames.db.models.game import Game

router = APIRouter()


@router.get("/all")
async def get_all_rooms():
    queryset = Game.objects.filter(finished=False)
    rooms = await queryset.values_list('room_name', flatten=True)
    return list(rooms)
