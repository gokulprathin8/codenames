import gameRoomStyles from "../styles/gamepage.room.css";
import playerImage from "../../public/images/spyware.png";
import codenamesCover from "../../public/images/codenames-cover.jpg";
import { useState } from "react";

const GamePage = () => {
    const [play, setPlay] = useState(false);
    // const [tmr, setTmr] = useState(false);
    const [rst, setRst] = useState(false);
    const [rules, setRules] = useState(false);
    const [pname, setPname] = useState(false);
    const [clue, setClue] = useState(false);

    return (
        <div>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <div className="top-container">
                <button className="btn-top" onClick={() => setPlay(!play)}>
                    <p>Players -</p>
                </button>
                {play && (
                    <div className="playdiv">
                        <div>
                            <p>
                                Send this link to your friends to invite them to this
                                room:
                            </p>
                            <br></br>
                            <div className="linkToShow">
                                <p>link to show</p>
                            </div>
                            <br></br>
                            <button className="btn-popups">Copy To Clipboard</button>
                        </div>
                    </div>
                )}
                {/*<button className="btn-top" onClick={() =>setTmr(!tmr)}>
                    <p>Timer</p>
                </button>
                /*{tmr && <div className="tmrdiv">
                    <div>
                        <p>Send this link to your friends to invite them to this room:</p>
                        <br></br>
                        <div className="linkToShow"><p>link to show</p></div>
                        <br></br>
                        <button className="btn-popups">Copy To Clipboard</button>
                    </div>
    </div> }*/}
                <button
                    className="btn-top"
                    id="top-left-btns"
                    onClick={() => setPname(!pname)}
                >
                    <p>Player Name</p>
                </button>
                {pname && (
                    <div className="pnamediv">
                        <div className="sep-border">
                            <div className="changetm">
                                <button className="btn-popups">
                                    Change to Red/Blue team
                                </button>
                            </div>
                            <br></br>
                            <p>Nickname:</p>
                            <div className="nickname">
                                <input
                                    type="text"
                                    name="name"
                                    id="nicknameform"
                                    placeholder="Display Player Name"
                                />
                            </div>
                            <button className="btn-popups">Update Your Nickname</button>
                        </div>
                        <button id="leave-btn" className="btn-popups">
                            Leave The Room
                        </button>
                    </div>
                )}
                <button
                    className="btn-top"
                    id="top-left-btns"
                    onClick={() => setRules(!rules)}
                >
                    <p>Rules</p>
                </button>
                {rules && (
                    <div className="rulesdiv">
                        <div>
                            <div className="rules-title">
                                <h1>Rules</h1>
                            </div>
                            <br></br>
                            <p className="rule-text">
                                Codenames is a game for two teams. There is a grid of 25
                                words. Some of them are secretly assigned to the Red
                                Team, some to the Blue Team. One player from each team
                                is the Spymaster, and only Spymasters see which words
                                belong to which team. Spymasters take turns giving clues
                                to their teammates (Operatives), trying to lead them to
                                guessing their team's words. The team that guesses all
                                their words first wins the game.
                            </p>
                            <br></br>
                            <h2>Dividing into Teams</h2>
                            <p className="rule-text">
                                <ul>
                                    <li>
                                        Divide all players into two teams, red and blue.
                                    </li>
                                    <li>
                                        One player from each team should click on Join
                                        as Spymaster. He/she will then see the colors of
                                        the cards.
                                    </li>
                                    <li>
                                        Everyone else should click on Join as Operative.
                                        They do not see the colors of the cards.
                                    </li>
                                </ul>
                            </p>
                            <br></br>
                            <h2>Giving Clues</h2>
                            <p className="rule-text">
                                Spymasters give clues. When it’s your turn to give a
                                clue, tap some words in your color that you want to give
                                a clue for. Then type in a one word clue that relates to
                                all selected words. Your Operatives will only see the
                                clue and the number of marked cards.
                            </p>
                            <br></br>
                            <p className="rule-text" id="warning-text">
                                Watch out for the black card – it’s an Assassin! Avoid
                                clues that would lead to the assassin or to the other
                                team's words.
                            </p>
                            <br></br>
                            <h2>Guessing</h2>
                            <p className="rule-text">
                                <ul>
                                    <li>
                                        Operatives guess the words based on the
                                        Spymaster’s clue.
                                    </li>
                                    <li>
                                        To guess the card simply cllick on the card to
                                        see the color.
                                    </li>
                                    <li>
                                        If you guess a word of your team's color, you
                                        may guess again. You'll want to guess as many
                                        words as your Spymaster indicated.
                                    </li>
                                </ul>
                            </p>
                            <br></br>
                            <h2>End of Turn</h2>
                            <p className="rule-text">
                                Your turn can end in one of three ways:
                                <ul>
                                    <li>
                                        Guessing a word of the opponent's color or
                                        neutral color.
                                    </li>
                                    <li>
                                        Ending guessing manually by clicking the button.
                                    </li>
                                    <li>
                                        Reaching the maximum number of guesses (clue
                                        number + 1).
                                    </li>
                                </ul>
                            </p>
                            <br></br>
                            <h2>Winning and Losing</h2>
                            <p className="rule-text">
                                Teams alternate turns. A team wins once all their words
                                have been guessed. They lose if they guess the Assassin!
                            </p>
                            <br></br>
                            <button
                                className="btn-popups"
                                id="close-rules"
                                onClick={() => setRules(!rules)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                <button
                    className="btn-top"
                    id="top-left-btns"
                    onClick={() => setRst(!rst)}
                >
                    <p>Reset Game</p>
                </button>
                {rst && (
                    <div className="rstdiv">
                        <div>
                            <p>This will reset the game for the current table</p>
                            <br></br>
                            <p id="warning-text">
                                Warning!this will reset the current running game!
                            </p>
                            <br></br>
                            <button className="btn-popups">Reset Game</button>
                        </div>
                    </div>
                )}
            </div>
            <br></br>
            <div className="container">
                <div className="leftmost-container">
                    <div className="container-red">
                        <div>
                            <p id="redscore">Score</p>
                        </div>
                        <div>
                            <img
                                className="player-icon"
                                src={playerImage}
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
                        <div>
                            <p id="bluescore">Score</p>
                        </div>
                        <div>
                            <img
                                className="player-icon"
                                src={playerImage}
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
                    <div className="bottom-box">
                        <p className="chat-tittle">Game Log</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function links() {
    return [{ rel: "stylesheet", href: gameRoomStyles}];
}

export default GamePage;
