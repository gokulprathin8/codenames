import {SERVER_URL} from "../constants";

export async function spymasterClue(text, roomId, team, user, game) {
    const clue = await fetch(`${SERVER_URL}game/spymaster_response`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + user,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_id: roomId,
            game_id: game,
            text: text,
            team: team
        })
    });
    return clue.json();
}
