from databases import Database

from codenames.settings import settings

database = Database(str(settings.db_url))
