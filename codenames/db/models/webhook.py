import ormar

from codenames.db.models.game import Game


class Webhook(ormar.Model):
    id: int = ormar.Integer(primary_key=True)
    url: str = ormar.String(max_length=2048)
    game: int = ormar.ForeignKey(Game)
