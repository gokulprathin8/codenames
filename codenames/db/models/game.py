import datetime
from enum import Enum
from typing import Optional, Union

import ormar

from codenames.db.base import BaseMeta


class PlayerType(str, Enum):
    operative = "Operative"
    spymaster = "Spy Master"


class Teams(str, Enum):
    Red = "Red"
    Blue = "Blue"


class Player(ormar.Model):
    class Meta(BaseMeta):
        tablename = "player"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=255)
    unique_identifier: str = ormar.String(max_length=1024)
    active_from: datetime = ormar.DateTime(default=datetime.datetime.now)
    browser_details: dict = ormar.JSON(default={})
    player_type: PlayerType = ormar.Enum(
        enum_class=PlayerType,
        default=PlayerType.operative,
    )


class GameLog(ormar.Model):
    class Meta(BaseMeta):
        tablename = "player_log"

    id: int = ormar.Integer(primary_key=True)
    player: int = ormar.ForeignKey(Player)
    spy_master_keyword: str = ormar.String(max_length=255)
    spy_master_keyword_count: int = ormar.Integer(default=1)


class Game(ormar.Model):
    class Meta(BaseMeta):
        tablename = "game"

        id: int = ormar.Integer(primary_key=True)
        room_name: str = ormar.String(max_length=255)
        finished: bool = ormar.Boolean(default=False)
        current_turn: str = ormar.String(
            choices=Teams,
            default=Teams.Blue,
            max_length=24,
        )

        created_at: ormar.DateTime(default=datetime.datetime.now)
        updated_at: ormar.DateTime(default=datetime.datetime.now)

        players: Optional[Union[Player, None]] = ormar.ForeignKey(Player)

        async def save(self, *args, **kwargs):
            self.updated_at = datetime.datetime.now()
            if not self.id:
                self.created_at = datetime.datetime.now()
            return await super().save(*args, **kwargs)


class GameStats(ormar.Model):
    class Meta(BaseMeta):
        tablename = "game_stats"

    id: int = ormar.Integer(primary_key=True)
    card_identifier: str = ormar.String(max_length=1024)
    card_data: str = ormar.String(max_length=255)
    is_revealed: bool = ormar.Boolean(default=False)
