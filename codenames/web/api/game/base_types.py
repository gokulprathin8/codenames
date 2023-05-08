from pydantic import BaseModel


class GameRoomBody(BaseModel):
    room_name: str


class CreateLog(BaseModel):
    text: str
    game_id: int
