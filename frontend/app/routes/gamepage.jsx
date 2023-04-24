import React, { useState } from "react";
import gameRoomStyles from "../styles/gamepage.room.css";
import playerOneImage from "../../public/images/player_one.svg";
import playerTwoImage from "../../public/images/player_two.svg";
import codenamesCover from "../../public/images/codenames-cover.jpg";

const GamePage = () => {
    return (
        <div className="container">
        <div className="container-red">
            <div>
                <img className="player-icon" src={playerOneImage} width={80} height={80} alt="player-icon-two" />

                <p className="operative-text">Current Operatives:</p>

                {/* add operative iteration code here */}
                <p className="operative-text">-</p>

            </div>
            <button className="red-button">Join as Operative</button>
            <br></br><br></br>
            <button className="red-button">Join as Spymaster</button>
        </div>
        <div className="container-game-menu">
            <div>
                <h2 className="game-setup-text">About the Game</h2>

                <div className="game-description-container">
                    <img src={codenamesCover}
                         width={150}
                         height={200}
                         className="code-names-image"
                         alt="codenames-image"
                    />
                    <div className="inner-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>



                </div>
            </div>
        </div>
        <div className="container-blue">
            <div>
                <img className="player-icon" src={playerTwoImage} width={80} height={80}  alt="player-icon-one"/>

                <p className="operative-text">Current Operatives:</p>

                {/* add operative iteration code here */}
                <p className="operative-text">-</p>

            </div>
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
