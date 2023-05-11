from pydantic import BaseModel

from codenames.db.models.game import Teams


class GameRoomBody(BaseModel):
    room_name: str


class CreateLog(BaseModel):
    text: str
    game_id: int


class PlayerTypeIn(BaseModel):
    room_id: int
    spymaster: bool
    operative: bool
    team_color: Teams


class SpymasterResponse(BaseModel):
    room_id: int
    game_id: int
    text: str
    team: Teams
