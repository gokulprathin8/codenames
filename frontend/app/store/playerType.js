import {SERVER_URL} from "../constants";

export async function joinTeam(color, mode, roomId, user) {
    let spymaster;
    let operative;
    let team_color;

    if (mode === 'spymaster') {
        spymaster = true;
        operative = false;
    } else {
        spymaster = false;
        operative = true;
    }

    if (color === 'blue') {
        team_color = 'Blue'
    } else {
        team_color = 'Red'
    }

    await fetch(`${SERVER_URL}game/player_type`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user
        },
        body: JSON.stringify({
            'room_id': roomId,
            spymaster,
            operative,
            team_color
        })
    });

}
