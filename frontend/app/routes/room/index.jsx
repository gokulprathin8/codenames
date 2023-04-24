import styled from "styled-components"
import { Link } from "@remix-run/react"
import createRoomStyles from "../../styles/index.room.css"
const Room = () => {
    return (
        <div className="container">                   
            <h4 className="create-room-heading">Welcome to Codenames</h4>
            <label className="label-style">To enter into the session, choose a nickname.</label>
            <br></br><br></br>
            <input className="text-container" type="text" placeholder="Enter your nickname"/>
            <br></br><br></br>
            <Link to="/room/gamepage">
                <button className="button-style">Create Room</button>   
            </Link>
            
        </div>
    )
}

export function links() {
    return [{ rel: 'stylesheet', href: createRoomStyles }]
}

export default Room;
