from pydantic import BaseModel


class GameRoomBody(BaseModel):
    room_name: str

