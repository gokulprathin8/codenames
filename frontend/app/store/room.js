import {SERVER_URL} from "../constants";


export async function createRoom(user, roomName) {
    const room = await fetch(`${SERVER_URL}game/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user['access_token'],
        },
        body: JSON.stringify({room_name: roomName}),

    })
    return await room.json();
}
