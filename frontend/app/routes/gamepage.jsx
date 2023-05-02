import gameRoomStyles from "../styles/gamepage.room.css";
import playerOneImage from "../../public/images/spyware.png";
import playerTwoImage from "../../public/images/spyware.png";
import codenamesCover from "../../public/images/codenames-cover.jpg";

const GamePage = () => {
    return (
        <div>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <div className="top-container">
                <button className="btn-top">
                    <p>Players -</p>
                </button>
                <button className="btn-top">
                    <p>Timer</p>
                </button>
                <button className="btn-top" id="top-left-btns">
                    <p>Player Name</p>
                </button>
                <button className="btn-top" id="top-left-btns">
                    <p>Rules</p>
                </button>
            </div>

            <div className="container">
                <div className="leftmost-container">
                    <div className="container-red">
                    <div><p id="redscore">Score</p></div>
                        <div>
                            <img
                                className="player-icon"
                                src={playerOneImage}
                                width={80}
                                height={80}
                                alt="player-icon-two"
                            />

                            <p className="operative-text">Current Operatives:</p>

                            {/* add operative iteration code here */}
                            <p className="operative-text">-</p>
                        </div>
                        <button className="red-button">Join as Operative</button>
                        <br></br>
                        <button className="red-button">Join as Spymaster</button>
                    </div>
                </div>

                <div className="center">
                    <div className="container-game-menu">
                        <div className="information">
                            <h2 className="game-setup-text">About the Game</h2>

                            <div className="game-description-container">
                                <img
                                    src={codenamesCover}
                                    width={150}
                                    height={200}
                                    className="code-names-image"
                                    alt="codenames-image"
                                />
                                <div className="inner-description">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book. It has
                                    survived not only five centuries, but also the leap
                                    into electronic typesetting, remaining essentially
                                    unchanged. It was popularised in the 1960s with the
                                    release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing
                                    software like Aldus PageMaker including versions of
                                    Lorem Ipsum.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightmost-container">
                    <div className="container-blue">
                    <div><p id="bluescore">Score</p></div>
                        <div>
                            <img
                                className="player-icon"
                                src={playerTwoImage}
                                width={80}
                                height={80}
                                alt="player-icon-one"
                            />

                            <p className="operative-text">Current Operatives:</p>

                            {/* add operative iteration code here */}
                            <p className="operative-text">-</p>
                        </div>
                        <button className="blue-button">Join as Operative</button>
                        <br></br>
                        <button className="blue-button">Join as Spymaster</button>
                    </div>
                    <div class="bottom-box">
                        <p className="chat-tittle">Game Log</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function links() {
    return [{ rel: "stylesheet", href: gameRoomStyles }];
}

export default GamePage;
