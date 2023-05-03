import datetime

import ormar
from codenames.db.base import BaseMeta


class User(ormar.Model):
    class Meta(BaseMeta):
        tablename = "users"

    id: int = ormar.Integer(primary_key=True)
    username: str = ormar.String(max_length=255)
    password: str = ormar.String(max_length=1024)
    created_at: datetime = ormar.DateTime(default=datetime.datetime.now())


