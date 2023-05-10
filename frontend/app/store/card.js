import {SERVER_URL} from "../constants";

export async function reveal_card(user, index, roomId) {
    const card = await fetch(`${SERVER_URL}game/reveal_card?room_id=${roomId}&index=${index}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['access_token']}`
        }
    });
    return card.json();
}
