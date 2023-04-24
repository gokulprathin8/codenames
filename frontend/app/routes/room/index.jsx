import styled from "styled-components"
import createRoomStyles from "../../styles/index.room.css"
const Room = () => {
    return (
        <div className="container">                   
            <h4 className="create-room-heading">Welcome to Codenames</h4>
            <label className="label-style">To enter into the session, choose a nickname.</label>
            <br></br><br></br>
            <input className="text-container" type="text" placeholder="Enter your nickname"/>
            <br></br><br></br>
            <button className="button-style">Create Room</button>
        </div>
    )
}

export function links() {
    return [{ rel: 'stylesheet', href: createRoomStyles }]
}

export default Room;
