import React, { useEffect, useState } from "react";
import playGameStyles from "../styles/playgame.room.css";
import playerImage from "../../public/images/spyware.png";
import Popup from "reactjs-popup";
import useAuthStore from "../store/auth";
import { useNavigate } from "@remix-run/react";
import useCardsStore, {get_all_cards, reveal_card} from "../store/card";
import useRoomStore from "../store/room";
import {joinTeam} from "../store/playerType";
import {SERVER_URL} from "../constants";
import {spymasterClue} from "../store/game";
import {toast, ToastContainer} from "react-toastify";

const PlayGame = () => {
    const navigate = useNavigate();

    const [gameState, setGameState] = useState(null);
    const [etag, setEtag] = useState(null);
    const [redOperatives, setRedOperatives] = useState([]);
    const [blueOperatives, setBlueOperatives] = useState([]);
    const [isSpy, setIsSpy] = useState(false);
    const [spymasterClueInput, setSpymasterClueInput] = useState("");

    const [redSpyMasterEmail, setRedSpyMasterEmail] = useState("");
    const [blueSpyMasterEmail, setBlueSpyMasterEmail] = useState("");
    const [gameScore, setScore] = useState({Red: 0, Blue: 0});
    const [chatLog, setChatLog] = useState([]);

    const cards = useCardsStore((state) => state.cardData);
    const setCards = useCardsStore((state) => state.setCardData);
    const addColorToCard = useCardsStore((state) => state.addColorToCard);

    const [rules, setRules] = useState(false);
    const [value, setValue] = useState("");

    const jwtToken = useAuthStore((state) => state.jwtToken);
    const roomId = useRoomStore((state) => state.roomId);
    const userProfileData = useAuthStore((state) => state.userProfile);

    let spyMasterMove = false;
    let operativeMove = false;
    if (gameState && gameState[0]['me'].length) {
        spyMasterMove = (gameState && gameState[0]['me'][0]['spymaster']) && (gameState && gameState[0]['state'][0]['status'].split(" ")[1] === "SPY") && // check if spymaster is allowed to play
                        (gameState && gameState[0]['me'][0]['team_color']) && (gameState && gameState[0]['state'][0]['turn'])  // check if the correct team is playing
        operativeMove = (gameState && gameState[0]['me'][0]['operative']) && (gameState && gameState[0]['state'][0]['status'].split(" ")[1] === "OPERATIVE") && // check if spymaster is allowed to play
                        (gameState && gameState[0]['me'][0]['team_color']) && (gameState && gameState[0]['state'][0]['turn'])  // check if the correct team is playing
    }

  useEffect(() => {
        async function fetchGameState() {
          const headers = {
              Authorization: 'Bearer ' + jwtToken
          };
          let serverUrl;
          if (etag) {
            headers["If-None-Match"] = etag;
          }

          if (gameState && gameState[0]['me'].length && gameState[0]['me'][0]['spymaster']) {
              serverUrl = `${SERVER_URL}poll/state?room_id=${roomId}&spymaster=true`
          } else {
              serverUrl = `${SERVER_URL}poll/state?room_id=${roomId}&spymaster=false`
          }

          const response = await fetch(serverUrl, { headers });
          if (response.status === 200) {
            const data = await response.json();
            setGameState(data);
            setCards(data[0]['card']);
            setChatLog(data[0]['log']);

            let blueOperative = [];
            let redOperative = [];
            const players = data[0]['players'];
            players.forEach(p => {
                if (p['team_color'] === "Red") {
                    if (p['operative']) {
                        redOperative.push(p['user__username'])
                    } else {
                        setRedSpyMasterEmail(p['user__username'])
                    }
                } else {
                    if (p['operative']) {
                        blueOperative.push(p['user__username'])
                    } else {
                        setBlueSpyMasterEmail(p['user__username'])
                    }
                }
            });

            setRedOperatives(redOperative);
            setBlueOperatives(blueOperative);
            calculateScores(data[0]['card'])

          } else if (response.status === 304) {
            // The server has not sent new data, reuse the previous state
          }
        }

        const intervalId = setInterval(fetchGameState, 1000);
        return () => clearInterval(intervalId);
  });

    function calculateScores(cardData) {
        let blueScore = 0;
        let redScore = 0;
        cardData.forEach(card => {
            if (card["is_revealed"]) {
                if (card["color"] === "Red") {
                    redScore = redScore + 1;
                }
                if (card["color"] === "Blue") {
                    blueScore = blueScore + 1;
                }
            }
        });
        setScore({Blue: blueScore, Red: redScore});
    }

    useEffect( () => {
        if (!jwtToken) {
            console.log("User not authenticated. Redirect to Authentication page.");
            navigate("/auth/login");
        }

        // fetch cards
        const cardsSideEffect = async () => {
            return await get_all_cards(jwtToken, roomId);
        };
        cardsSideEffect().then(
            (d) => {
                setCards(d)
            }
        );
    }, [jwtToken, navigate, roomId, setCards]);

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
          if (card.sequence === id && !card.is_revealed) {
            return {
              ...card,
              is_revealed: true,
            };
          }
          return card;
        });
        setCards(updatedCards);

       const cardDetail = await reveal_card(jwtToken, id, roomId, gameState[0]['state'][0]['id']);
            addColorToCard(cardDetail.id, cardDetail.color);
            console.log(cardDetail);
       if (cardDetail && (cardDetail['color']) !== gameState[0]['me'][0]['team_color']) {
            await handleClueButton();
            toast('🦄 Wow so easy!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
       }
    }

  function handleSpymasterInput(e) {
        setSpymasterClueInput(e.target.value);
  }


  useEffect(() => {

      async function traversePlayerType() {
        let players = gameState ? gameState[0]['players'] : [];
        players.forEach(p => {
            if (p['user__username'] === userProfileData['username']) {
                if (p['spymaster']) {
                    setIsSpy(true);
                } else {
                    setIsSpy(false);
                }
            }
        });
    }
    async function fetchData() {
      await traversePlayerType();
    }
    fetchData();
  }, [gameState, userProfileData]);


    async function handlePlayerJoin(e) {
        let mode;
        let color;
        if (e.target.className === 'red-button') {
            color = 'red';
        } else {
            color = 'blue';
        }
        if (e.target.innerText === "JOIN AS OPERATIVE") {
            mode = 'operative'
        } else {
            mode = 'spymaster'
        }

        await joinTeam(color, mode, roomId, jwtToken);
    }


    async function handleClueButton() {
        let team = gameState[0]['state'][0]['turn'];
        let gameId = gameState[0]['state'][0]['id'];
        console.log(spymasterClueInput, roomId, team, jwtToken, gameId);
        await spymasterClue(spymasterClueInput, roomId, team, jwtToken, gameId);
        setSpymasterClueInput("");
    }

    async function handleGameWinner() {
        let winner;
        if (gameScore && gameScore['Red'] === 12) {
            winner = 'Red'
        } else {
            winner = 'Blue'
        }
        await fetch(`${SERVER_URL}game/winner_details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                'room_id': roomId,
                'game_id': gameState[0]['state'][0]['id'],
                'winner': winner
            })
        }).then(r => {
            navigate('/gamepage');
        });
    }

    return (
        <div>
            {
                gameScore && (gameScore['Red'] === 12 || gameScore['Blue'] === 12) ?
                <div style={{ position: "absolute", zIndex: "10", backgroundColor: "white", width: "30%", height: "40%", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: "15px" }}>
                    <p style={{ textAlign: "center", paddingTop: "25%", fontSize: "xxx-large"}}> 🎉</p>
                    <h1 style={{ textAlign: "center", fontSize: "xxx-large"}}>Team {gameScore['Red'] === 12 ? "Red" : "Blue"} Won!</h1>
                    <div style={{  display: "flex", flexDirection: "row"}}>
                        <button onClick={handleGameWinner} style={{ marginTop: "30px", marginLeft: "45%", padding: "10px", border: "1px solid red", borderRadius: "10px", backgroundColor: "white", cursor: "pointer" }}>Close</button>
                    </div>
                </div> : null
            }


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
                {
                    <p>{gameState ? gameState[0]['state'][0]['status'] : 'Loading...'}</p>
                }
            </div>

            <div className="container">
                <div className="leftmost-container">
                    <div className="container-red">
                        <div>
                            <h1 style={{ textAlign: "center", fontSize: "xxx-large", color: "white" }}>{gameScore["Red"]}</h1>
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

                            {redOperatives.length ? redOperatives.map(t => (
                                <p style={{ padding: "4px", color: "white" }} key={t} className="operative-text">
                                    {t}
                                </p>
                            )): <p style={{ padding: "4px", color: "white" }}> No Players Joined this team yet. </p>}
                        </div>
                        <button className="red-button" onClick={handlePlayerJoin}>Join as Operative</button>
                        <br></br>
                        {
                            <p>{redSpyMasterEmail}</p>
                        }
                        <button className="red-button" onClick={handlePlayerJoin}>Join as Spymaster</button>
                    </div>
                </div>

                <div className="center">
                    <div className="cards-container-5-by-5">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={`card${card.is_revealed || isSpy? " flipped" : ""}`}
                                onClick={() => handleCardClick(card.sequence)}
                            >
                            <div id={index.toString()} className="card-front">
                                <div className="preflip-text">
                                    <p className="flip-text">{card && card['text'] ? card['text'] : 'Loading...'}</p>
                                </div>

                            </div>
                            <div id={index.toString()} className="card-back" style={{ backgroundColor: card.color === "Blue"? "cadetblue" : card.color === "Red" ? "indianred": "gray" }}>
                                <div className="preflip-text">
                                    <p  className="flip-text">{card && card['text'] ? card['text'] : 'Loading...'}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    {
                        spyMasterMove
                            ?
                            <div className="below-container">
                                <input
                                    type="text"
                                    id="text-input"
                                    placeholder=">>Give clue to your team"
                                    onChange={handleSpymasterInput}
                                ></input>
                                <Cluetip />
                                <button className="btn-below" onClick={handleClueButton}>Give Clue</button>
                            </div> :
                        operativeMove ?
                                    <button onClick={handleClueButton}
                                    style={{ cursor: "pointer", color: "white",borderRadius: "20px",border: "1px solid white", padding: "15px",backgroundColor: "red", width: "inherit", textAlign: "center", fontSize: "medium"  }}>End Turn</button>
                        : null
                    }

                </div>

                <div className="rightmost-container">
                    <div className="container-blue">
                        <div>
                            <h1 style={{ textAlign: "center", fontSize: "xxx-large", color: "white" }}>{gameScore["Blue"]}</h1>
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
                            {blueOperatives.length ? blueOperatives.map(t => (
                                <p key={t} style={{ padding: "4px", color: "white" }} className="operative-text">
                                    {t}
                                </p>
                            )) : <p style={{ padding: "4px", color: "white" }}> No Players Joined this team yet. </p>}
                        </div>
                        <button className="blue-button" onClick={handlePlayerJoin}>Join as Operative</button>
                        <br></br>
                        <button className="blue-button" onClick={handlePlayerJoin}>Join as Spymaster</button>
                    </div>
                    <div className="bottom-box">
                        <p className="chat-tittle">Game Log</p>

                        <div style={{ backgroundColor: "white", textAlign: "left",
                            width: "100%", height: "100%", overflow: "scroll", paddingTop: "10px", paddingLeft: "10px"}}>
                            {
                                chatLog && chatLog.map(data => (
                                    <div>
                                        <p style={{ fontSize: "xx-small", padding: "5px" }}>
                                            {data['game__turn']} Spymaster Clue: {data['text']}
                                        </p>
                                        <hr/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export function links() {
    return [{ rel: "stylesheet", href: playGameStyles }];
}

export default PlayGame;
