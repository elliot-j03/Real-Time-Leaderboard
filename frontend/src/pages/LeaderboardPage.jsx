// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Components
import SubmitBox from "../components/SubmitBox";
import Leaderboard from "../components/Leaderboard";
import TopThree from "../components/TopThreeBox";
import LoadingSpinner from "../components/LoadingSpinner"

function LBPage({ userData }) {
    const [userList, setUserList] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const navigate = useNavigate();


    function navHome() {
        const path = auth?.currentUser?.uid !== undefined ? `/${auth?.currentUser?.uid}` : "/";
        navigate(path);
    }

    function navLogIn() {
        navigate("/login");
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/leaderboard");
        } catch (err) {
            console.log("[ERROR] LeaderboardPage.jsx/logOut: " + err);
        }
    }
    const logInState = (auth.currentUser == null ? navLogIn : logOut);
    

    // Make blank leaderboard look better
    useEffect(() => {
        if (userData) {
            const semidUD = Object.entries(userData).map(([ uid, details ]) => {
                return details;
            })
            const finalUD = semidUD.map(({ email, score, username }) => {
                return [username, score];
            })
            const udArr = finalUD.sort((a , b) => b[1] - a[1]);
            
            // 1: Make an array of number group arrays
            // e.g. 20, 13, 12, 12, 9 => [[20], [13], [12, 12], [9]]
            let littleArr = [];
            let bigArr = [];
            for (let i = 0; i < udArr.length; i++) {
                if (i === 0) {
                    littleArr.push(udArr[i][1]);
                }
                else if (udArr[i][1] !== udArr[i-1][1] && i !== udArr.length - 1) {
                    bigArr.push(littleArr);
                    littleArr = [udArr[i][1]];
                } else if (udArr[i][1] !== udArr[i-1][1] && i === udArr.length - 1) {
                    bigArr.push(littleArr);
                    littleArr = [udArr[i][1]];
                    bigArr.push(littleArr);
                } else if (udArr[i][1] === udArr[i-1][1] && i !== udArr.length - 1) {
                    littleArr.push(udArr[i][1]);
                } else if (udArr[i][1] === udArr[i-1][1] && i === udArr.length - 1) {
                    littleArr.push(udArr[i][1]);
                    bigArr.push(littleArr);
                }
            }
            
            // 2: Finds the leaderboard position, and amount of times the position is taken
            // e.g. [[20], [13], [12, 12], [9]] => [[1, 1], [2, 1], [3, 2], [5, 1]]
            let pos = 1;
            let posArr = [];
            let miniArr = [];
            for (let i = 0; i < bigArr.length; i++) {
                if (i === 0) {
                    miniArr.push([pos, bigArr[i].length]);
                    posArr.push(miniArr);
                    miniArr = [];
                } else {
                    pos = bigArr[i-1].length + pos;
                    miniArr.push([pos, bigArr[i].length]);
                    posArr.push(miniArr);
                    miniArr = [];
                }
            }

            // 3: Makes an array of the ranks
            // e.g. [[1, 1], [2, 1], [3, 2], [5, 1]] => [1, 2, 3, 3, 5]
            // for some reason they are nested arrays, i don't know why
            let ranksArr = [];
            for (let i = 0; i < posArr.length; i++) {
                let currentItem = posArr[i];
                let rank = currentItem[0][0];
                let count = currentItem[0][1];
            
                for (let j = 0; j < count; j++) {
                    ranksArr.push(rank);
                }
            }
            
            // 4. Append the ranks to the original user data and its done :)
            for (let i = 0; i < udArr.length; i++) {
                udArr[i].push(ranksArr[i]);
            }
            
            setUserList(udArr);
        }
    }, [userData]);

    useEffect(() => {
        if (userList.length > 0) {
            setLeaders([userList[0], userList[1], userList[2]]);
        }
    }, [userList]);
    

    // Returns if there is no leaderboard data
    if (userData === null || userData === undefined) {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                        flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                            <button onClick={navHome}>Home</button>
                            <button onClick={navLogIn}>Log In</button>
                    </div>
                <div className="home-page">
                    <h1>Leaderboard</h1>
                    <div style={{ display: "flex", flexDirection: "column"}}>
                        <h2>The leaderboard is currently empty...</h2>
                        {auth?.currentUser ? (
                            <div>
                                <SubmitBox />
                            </div>
                        ) : (
                            <div style={{ height: "2rem", display: "flex", flexDirection: "column",
                                justifyContent: "center", padding: "3rem"
                            }}>
                                <h3>Log in to add your score...</h3>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
        // Returns if there is leaderboard data
    } else {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                    flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                        <div style={{ paddingRight: "1rem" }}>
                            <button onClick={navHome}>Home</button>
                        </div>
                        <button onClick={logInState} style={{ flex: "0.2", maxWidth: "10rem"}}>{
                            auth?.currentUser ? "Log Out" : "Log In"}</button>
                </div>
                <div className="home-page">
                    <h1>Leaderboard</h1>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start",
                        backgroundColor: "#1e1e1e"
                    }}>
                        <div style={{ padding: "5rem", display: "flex", flexDirection: "column" }}>
                            <TopThree leaders={leaders} />
                            {auth?.currentUser ? (
                                <div>
                                    <SubmitBox />
                                </div>
                            ) : (
                                <div style={{ height: "2rem", display: "flex", flexDirection: "column",
                                    justifyContent: "center", padding: "3rem"
                                }}>
                                    <h3>Log in to add your score...</h3>
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                <Leaderboard 
                                userList={userList}
                                onItemSelect={null}
                                showGradients={true}
                                enableArrowNavigation={true}
                                displayScrollbar={true}
                                initialSelectedIndex={-1}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LBPage;