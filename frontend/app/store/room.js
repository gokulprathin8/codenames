import {SERVER_URL} from "../constants";
import {devtools, persist} from "zustand/middleware";
import {create} from "zustand";


export async function createRoom(user, roomName) {
    const room = await fetch(`${SERVER_URL}game/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user,
        },
        body: JSON.stringify({room_name: roomName}),

    })
    return await room.json();
}

export async function getAllRooms() {
    const rooms = await fetch(`${SERVER_URL}game/all`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    });
    return rooms.json();
}

const roomStore = (set) => ({
    roomId: null,
    setRoomId: (id) => set({roomId: id}),
})

const useRoomStore = create(
    devtools(
        persist(roomStore, {
            name: 'Room'
        })
    )
);

export default useRoomStore;
