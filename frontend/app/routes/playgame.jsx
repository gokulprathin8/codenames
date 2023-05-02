import playGameStyles from "../styles/playgame.room.css";
import playerOneImage from "../../public/images/spyware.png";
import playerTwoImage from "../../public/images/spyware.png";

const playGame = () => {
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
                <button className="btn-top" id="top-left-btns">
                    <p>Reset Game</p>
                </button>
            </div>

            <div className="below-top-container">
                <p>Game Status...</p>
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
                    <div class="cards-container-5-by-5">
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                    </div>
                    <div className="below-container">
                        <input
                            type="text"
                            id="text-input"
                            placeholder=">>Give clue to your team"
                        ></input>
                        <button className="btn-below">
                            <p>-</p>
                        </button>
                        <button className="btn-below">Give Clue</button>
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
    return [{ rel: "stylesheet", href: playGameStyles }];
}

export default playGame;
