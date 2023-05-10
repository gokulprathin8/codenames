import React, { useEffect, useState } from "react";
import playGameStyles from "../styles/playgame.room.css";
import playerImage from "../../public/images/spyware.png";
import Popup from "reactjs-popup";
import useAuthStore from "../store/auth";
import { useNavigate } from "@remix-run/react";
import {reveal_card} from "../store/card";
import useRoomStore from "../store/room";

const PlayGame = () => {
    const navigate = useNavigate();

    const [rules, setRules] = useState(false);
    const [value, setValue] = useState("");
    const cardsArray =[
        {
            index: 1,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 2,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 3,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 4,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 5,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 6,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 7,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 8,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 9,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 10,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 11,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 12,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 13,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 14,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 15,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 16,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 17,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 18,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 19,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 20,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 21,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 22,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 23,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 24,
            isFlipped: false,
            flipColor: "#2980b9",
        },
        {
            index: 25,
            isFlipped: false,
            flipColor: "#2980b9",
        }
    ];
    const [cards, setCards] = useState(cardsArray);

    const jwtToken = useAuthStore((state) => state.jwtToken);
    const roomId = useRoomStore((state) => state.roomId);

    useEffect(() => {
        if (!jwtToken) {
            console.log("User not authenticated. Redirect to Authentication page.");
            navigate("/auth/login");
        }
    }, [jwtToken, navigate]);

    const handleClick = (event) => {
        setValue(event.target.innerText);
    };
    /**
     * ! install react-js popup to run
     * ! the below code is to show a tooltip when players button is clicked
     */
    const Playerstip = () => (
        <Popup
            trigger={(open) => <button className="btn-top">Players -</button>}
            position="bottom center"
            closeOnDocumentClick
        >
            <div className="playdiv-popup-content">
                <p>Send this link to your friends to invite them to this room:</p>
                <br></br>
                <div className="link">
                    <p>link to show</p>
                </div>
                <br></br>
                <button className="btn-popups">Copy To Clipboard</button>
            </div>
        </Popup>
    );

    /**
     * ! the below code is to show a tooltip when player name button is clicked
     */
    const Playernametip = () => (
        <Popup
            trigger={(open) => (
                <button className="btn-top" id="top-left-btns">
                    Player Name
                </button>
            )}
            position="bottom center"
            closeOnDocumentClick
        >
            <div className="pnamediv-popup-content">
                <div className="sep-border">
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
        </Popup>
    );

    /**
     * ! the below code is to show a tooltip when reset button is clicked
     */
    const Resettip = () => (
        <Popup
            trigger={(open) => (
                <button className="btn-top" id="top-left-btns">
                    Reset
                </button>
            )}
            position="bottom center"
            closeOnDocumentClick
        >
            <div className="rstdiv-popup-content">
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
        </Popup>
    );

    /**
     * ! the below code is to show a tooltip when clue button is clicked
     */
    const Cluetip = () => (
        <Popup
            trigger={(open) => <button className="btn-below">Clue No:{value}</button>}
            position="bottom center"
            closeOnDocumentClick
        >
            <div className="cluediv-popup-content">
                <button className="clue-btn" onClick={handleClick}>
                    1
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    2
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    3
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    4
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    5
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    6
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    7
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    8
                </button>
                <button className="clue-btn" onClick={handleClick}>
                    9
                </button>
            </div>
        </Popup>
    );

    async function handleCardClick(id) {
        const updatedCards = cards.map((card) => {
          if (card.index === id && !card.isFlipped) {
            return {
              ...card,
              isFlipped: true,
            };
          }
          return card;
        });
        setCards(updatedCards);

       const card_detail = await reveal_card(jwtToken, id, roomId);
       console.log(card_detail);

      }

    return (
        <div>
            <div className="top-container">
                <Playerstip />
                <Playernametip />
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
                            <h2 className="rule-headings">Dividing into Teams</h2>
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
                            <h2 className="rule-headings">Giving Clues</h2>
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
                            <h2 className="rule-headings">Guessing</h2>
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
                            <h2 className="rule-headings">End of Turn</h2>
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
                            <h2 className="rule-headings">Winning and Losing</h2>
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
                <Resettip />
            </div>

            <div className="below-top-container">
                <p>Game Status...</p>
            </div>

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
                    <div className="cards-container-5-by-5">
                        {cards.map((card, index) => (
                            <div
                            key={index}
                            className={`card${card.isFlipped ? " flipped" : ""}`}
                            onClick={() => handleCardClick(card.index)}
                        >
                            <div id={index.toString()} className="card-front"></div>
                            <div id={index.toString()} className="card-back">
                                <p className="flip-text">Random</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="below-container">
                        <input
                            type="text"
                            id="text-input"
                            placeholder=">>Give clue to your team"
                        ></input>
                        <Cluetip />
                        <button className="btn-below">Give Clue</button>
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
    return [{ rel: "stylesheet", href: playGameStyles }];
}

export default PlayGame;
