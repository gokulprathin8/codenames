import requests
from typing import Dict, Any
from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
from starlette.responses import HTMLResponse

from codenames.db.models.game import GameLog

router = APIRouter()


class WebhookData(BaseModel):
    event: str
    data: Dict[str, Any]


@router.websocket("/")
async def websocket_connection(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message: {data}")


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/api/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.get("/test")
async def test_websocket():
    return HTMLResponse(html)
