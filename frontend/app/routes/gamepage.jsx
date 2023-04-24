import gameRoomStyles from "../styles/gamepage.room.css"
const GamePage = () => {
    return (
        <div className="container">
        <div className="container-red">
            <button className="red-button">Join as Operative</button>
            <br></br><br></br>
            <button className="red-button">Join as Spymaster</button>
        </div>
        <div className="container-blue">
            <button className="blue-button">Join as Operative</button>
            <br></br><br></br>
            <button className="blue-button">Join as Spymaster</button>
        </div>
        </div>
    )
}

export function links() {
    return [{ rel: 'stylesheet', href: gameRoomStyles }]
}

export default GamePage;
