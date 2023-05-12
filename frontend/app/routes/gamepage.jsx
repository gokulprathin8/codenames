import Popup from "reactjs-popup";
import React, {useEffect, useState} from "react";
import gameStyles from "../styles/gamepage.room.css";
import playerImage from "../../public/images/spyware.png";
import codenamesCover from "../../public/images/codenames-cover.jpg";
import useAuthStore, {userProfile} from "../store/auth";
import useRoomStore, {createRoom} from "../store/room";
import {useNavigate} from "@remix-run/react";
import { Spinner } from '@chakra-ui/react';
import {SERVER_URL} from "../constants";

const GamePage = () => {

    const navigate = useNavigate();

    const jwtToken = useAuthStore((state) => state.jwtToken);
    const setRoomId = useRoomStore((state) => state.setRoomId);
    const userProfileData = useAuthStore((state) => state.userProfile);
    const setUserProfile = useAuthStore((state) => state.setUserProfile);
    const [rules, setRules] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [allRooms, setAllRooms] = useState([]);


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
                    {
                        userProfileData &&
                        userProfileData['username'].split('@')
                    }
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
                            value={userProfileData && userProfileData['username']}
                            disabled={true}
                            style={{ cursor: 'not-allowed' }}
                        />
                    </div>
                </div>
                <button id="leave-btn" className="btn-popups">
                    Leave The Room
                </button>
            </div>
        </Popup>
    );

    function handleClick() {
        // TODO: Implement the on click function
    }

    function setRoomForJoin(room) {
        console.log(room);
    }

    function downloadReport(room) {
        // TODO: implement
    }

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

    const handleInputChange = (event) => {
        setRoomName(event.target.value);
    };

    async function onCreateRoom() {
        if (!jwtToken) {
            console.log('comes here');
            navigate('/auth/login');
        }
        else {
            createRoom(jwtToken, roomName).then(
                (data) => {
                    setRoomId(data['room_id']);
                    navigate('/playgame');
                }
            )
            setIsLoading(true);
            await createRoom(jwtToken, roomName);
            setIsLoading(false);
        }

    }

    useEffect(() => {
            if (!jwtToken) {
                console.log('User not authenticated. Redirect to Authentication page.')
                navigate('/auth/login');
            } else {

                userProfile(jwtToken).then(userDetails => {
                    setUserProfile(userDetails);
                })
            }

    }, [jwtToken, navigate, setUserProfile]);

    useEffect(() => {
        async function getAllRooms() {
            const rooms = await fetch(`${SERVER_URL}game/all`, {
                method: 'GET'
            });
            setAllRooms(await rooms.json())
        }

        const interval = setInterval(getAllRooms, 1000);
        return () => clearInterval(interval);
    });


    return (
        <div>
                  {isLoading && (
        <div className="spin" style={{display:"flex", flexDirection: "column"}}>
          <Spinner  thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' width={40} height={40}/>

          <p style={{paddingTop: "20px", marginLeft: "5px"}}>Loading...</p>
        </div>
      )}
            <div className="top-container">
                <Playerstip />
                {/*<Playernametip />*/}
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
                                    Codenames is a game for 4+ players.
                                    <br />
                                    <br />
                                    The teams are evenly divided into two teams red and blue,
                                    Choose one player per team to act as a Spymaster. Remaining players
                                    join as operatives. Spymasters give one-word clues to their team operatives,
                                    trying to associate with as many of the teams word on the card deck before.
                                    <br />
                                    <br />
                                    <b>The team who first guesses all their words win.</b>
                                    <br />
                                    <br />
                                    Check rules by clicking the button on top of the page for more information.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="setup-content">
                        <div className="game-rooms-div">
                            <div className="rooms">
                                <div className="rooms-tittle">Game Rooms</div>
                                <div className="rooms-scroll">
                                    {
                                         allRooms.map((d) =>  (
                                            <div key={d['share_uuid']}
                                                 className="room-tab" style={d['is_active'] ? { cursor: 'pointer' } : { cursor: 'pointer', backgroundColor: 'lightgreen' }}
                                                 onClick={() => d['is_active'] ? setRoomForJoin(d) : downloadReport(d)}
                                            >
                                                <div className="room-tab-image">
                                                    <img
                                                        src={playerImage}
                                                        width={40}
                                                        height={40}
                                                        alt="player"
                                                    />
                                                </div>
                                                <div className="room-tab-text">
                                                    <h5>Game Room #{d['name']}</h5>
                                                </div>
                                            </div>
                                         ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="new-room-div">
                            <div className="create-new-room">
                                <div className="new-room-input">
                                    <input
                                        type="text"
                                        placeholder="Enter Room Name"
                                        id="text-input-room"
                                        onChange={handleInputChange}
                                    />
                                    <button className="btn-room-create" onClick={onCreateRoom}>Create
                                    </button>
                                </div>
                            </div>
                            <div className="team">
                                <div className="team-tittle">
                                    <div className="team-members">
                                        <div className="our-team">
                                            <p id="tittle-team">Our Team</p>
                                        </div>
                                        <p>Gokul Prathin Asamani (G01397737)</p>
                                        <p>Sripath Cherukuri (G01395231)</p>
                                    </div>
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
    return [{ rel: "stylesheet", href: gameStyles }];
}

export default GamePage;
