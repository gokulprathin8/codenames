from ormar import ModelMeta

from codenames.db.config import database
from codenames.db.meta import meta


class BaseMeta(ModelMeta):
    """Base metadata for models."""

    database = database
    metadata = meta
