from pydantic import BaseModel


class CreateGameRoom(BaseModel):
    room_name: str

