import datetime
from enum import Enum
from typing import Optional, Union, List

import ormar

from codenames.db.base import BaseMeta
from codenames.db.models.user import User


class PlayerType(str, Enum):
    operative = "Operative"
    spymaster = "Spy Master"


class Teams(str, Enum):
    Red = "Red"
    Blue = "Blue"
    Black = "Black"


class GameStatus(str, Enum):
    RED_SPY_MASTER = "RED SPY MASTER IS PLAYING"
    BLUE_SPY_MASTER = "BLUE SPY MASTER IS PLAYING"
    RED_OPERATIVE = "RED OPERATIVE IS PLAYING"
    BLUE_OPERATIVE = "BLUE OPERATIVE IS PLAYING"


class Room(ormar.Model):
    class Meta(BaseMeta):
        tablename = "rooms"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=1024)
    share_uuid: str = ormar.String(max_length=1024)
    players: List[User] = ormar.ManyToMany(User, related_name="rooms")
    is_active: bool = ormar.Boolean(default=True)


class Game(ormar.Model):
    class Meta(BaseMeta):
        tablename = "game"

    id: int = ormar.Integer(primary_key=True)
    status: str = ormar.String(
        choices=GameStatus,
        max_length=1024
    )
    turn: str = ormar.String(
        choices=Teams,
        max_length=24
    )
    room: int = ormar.ForeignKey(Room)
    host: int = ormar.ForeignKey(User, related_name="game_host", null=True)


class Cards(ormar.Model):
    class Meta(BaseMeta):
        tablename = "cards"

    id: int = ormar.Integer(primary_key=True)
    room_name: int = ormar.ForeignKey(Game, related_name="game_cards")
    color: str = ormar.String(
        choices=Teams,
        max_length=24
    )
    text: str = ormar.String(max_length=255)
    game = ormar.ForeignKey(Game)


class Player(ormar.Model):
    class Meta(BaseMeta):
        tablename = "player_type"

    id: int = ormar.Integer(primary_key=True)
    room: int = ormar.ForeignKey(Room, related_name="player_room")
    spymaster: bool = ormar.Boolean(default=False)
    operative: bool = ormar.Boolean(default=False)
    team_color: str = ormar.String(
        choices=PlayerType,
        max_length=24
    )

#
#
# class Player(ormar.Model):
#     class Meta(BaseMeta):
#         tablename = "player"
#
#     id: int = ormar.Integer(primary_key=True)
#     name: str = ormar.String(max_length=255)
#     unique_identifier: str = ormar.String(max_length=1024)
#     active_from: datetime = ormar.DateTime(default=datetime.datetime.now)
#     browser_details: dict = ormar.JSON(default={})
#     player_type: PlayerType = ormar.Enum(
#         enum_class=PlayerType,
#         default=PlayerType.operative,
#     )
#
#
# class GameLog(ormar.Model):
#     class Meta(BaseMeta):
#         tablename = "player_log"
#
#     id: int = ormar.Integer(primary_key=True)
#     player: int = ormar.ForeignKey(Player)
#     spy_master_keyword: str = ormar.String(max_length=255)
#     spy_master_keyword_count: int = ormar.Integer(default=1)
#
#
# class Game(ormar.Model):
#     class Meta(BaseMeta):
#         tablename = "game"
#
#     id: int = ormar.Integer(primary_key=True)
#     room_name: str = ormar.String(max_length=255)
#     finished: bool = ormar.Boolean(default=False)
#     current_turn: str = ormar.String(
#         choices=Teams,
#         default=Teams.Blue,
#         max_length=24,
#     )
#
#     created_at: datetime = ormar.DateTime(default=datetime.datetime.now)
#     updated_at: datetime = ormar.DateTime(default=datetime.datetime.now)
#
#     players: Optional[Union[Player, None]] = ormar.ForeignKey(Player)
#
#     async def save(self, *args, **kwargs):
#         self.updated_at = datetime.datetime.now()
#         if not self.id:
#             self.created_at = datetime.datetime.now()
#         return await super().save(*args, **kwargs)


class GameStats(ormar.Model):
    class Meta(BaseMeta):
        tablename = "game_stats"

    id: int = ormar.Integer(primary_key=True)
    card_identifier: str = ormar.String(max_length=1024)
    card_data: str = ormar.String(max_length=255)
    is_revealed: bool = ormar.Boolean(default=False)
