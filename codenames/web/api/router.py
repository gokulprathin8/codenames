from fastapi.routing import APIRouter

from codenames.web.api import dummy, echo, monitoring, users, game, webhook, poll

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(echo.router, prefix="/echo", tags=["echo"])
api_router.include_router(dummy.router, prefix="/dummy", tags=["dummy"])
api_router.include_router(users.router, prefix="/auth", tags=["auth"])
api_router.include_router(game.router, prefix="/game", tags=["game"])
api_router.include_router(webhook.router, prefix="/ws", tags=["webhooks"])
api_router.include_router(poll.router, prefix="/poll", tags=["poll"])
