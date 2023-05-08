import requests
from typing import Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel

from codenames.db.models.game import GameLog
from codenames.db.models.webhook import Webhook

router = APIRouter()


class WebhookData(BaseModel):
    event: str
    data: Dict[str, Any]


@router.post("/webhook")
async def webhook(webhook_input: WebhookData):
    if webhook_input.event == 'update':
        game_log_id = webhook_input.data['id']
        game_log = await GameLog.objects.get(pk=game_log_id)
        message = f"Game log {game_log_id} has been updated!"
        # await send
