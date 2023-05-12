import asyncio
import datetime
import json
from enum import Enum
from typing import List

import ormar
from fastapi import websockets

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

    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now)
    updated_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now,
                                                   onupdate=datetime.datetime.now)


class GameWinner(ormar.Model):
    class Meta(BaseMeta):
        tablename = "game_winner"

    id: int = ormar.Integer(primary_key=True)
    room: int = ormar.ForeignKey(Room)
    game: int = ormar.ForeignKey(Game)
    winner: str = ormar.String(
        choices=Teams,
        max_length=255
    )
    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now)
    updated_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now,
                                                   onupdate=datetime.datetime.now)


class Cards(ormar.Model):
    class Meta(BaseMeta):
        tablename = "cards"

    id: int = ormar.Integer(primary_key=True)
    room_name: int = ormar.ForeignKey(Game, related_name="game_cards")
    color: str = ormar.String(
        choices=Teams,
        max_length=24
    )
    sequence: int = ormar.Integer(nullable=True)
    text: str = ormar.String(max_length=255)
    game = ormar.ForeignKey(Game)
    is_revealed: bool = ormar.Boolean(default=False)


class Player(ormar.Model):
    class Meta(BaseMeta):
        tablename = "player_type"

    id: int = ormar.Integer(primary_key=True)
    room: int = ormar.ForeignKey(Room, related_name="player_room")
    spymaster: bool = ormar.Boolean(default=False)
    operative: bool = ormar.Boolean(default=False)
    team_color: str = ormar.String(
        choices=Teams,
        max_length=24
    )
    user: int = ormar.ForeignKey(User, related_name="player_details")


class GameLog(ormar.Model):

    class Meta(BaseMeta):
        tablename = "game_log"
    id: int = ormar.Integer(primary_key=True)
    game: int = ormar.ForeignKey(Game)
    text: str = ormar.String(max_length=2048)
    identifier: str = ormar.String(max_length=1024)
    generated_by: int = ormar.ForeignKey(User)

    created_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now)
    updated_at: datetime.datetime = ormar.DateTime(default=datetime.datetime.now,
                                                   onupdate=datetime.datetime.now)
    card: int = ormar.ForeignKey(Cards, nullable=True)

    async def save(self, **kwargs):
        if self.pk:
            self.updated_at = datetime.datetime.now()
        else:
            self.created_at = datetime.datetime.now()

        await super().save(**kwargs)
        # await self.trigger_websockets()

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


class Webhook(ormar.Model):
    id: int = ormar.Integer(primary_key=True)
    url: str = ormar.String(max_length=2048)
    game: int = ormar.ForeignKey(Game)


class GameStats(ormar.Model):
    class Meta(BaseMeta):
        tablename = "game_stats"

    id: int = ormar.Integer(primary_key=True)
    card_identifier: str = ormar.String(max_length=1024)
    card_data: str = ormar.String(max_length=255)
    is_revealed: bool = ormar.Boolean(default=False)
