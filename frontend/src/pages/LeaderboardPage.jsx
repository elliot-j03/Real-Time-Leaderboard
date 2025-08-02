// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
// Components
import LBBox from "../components/LeaderboardBox";
import SubmitBox from "../components/SubmitBox";

function LBPage({ userData }) {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();


    function navHome() {
        const path = auth?.currentUser?.uid !== undefined ? `/${auth?.currentUser?.uid}` : "/";
        navigate(path);
    }

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
    if (userData === null || userData === undefined) {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                        flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                            <button onClick={navHome}>Home</button>
                    </div>
                <div className="home-page">
                    <button onClick={navHome}>Home</button>
                    <h1>Leaderboard</h1>
                    <h2>The leaderboard is currently empty...</h2>
                </div>
            </>
        )
    }else {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                    flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                        <button onClick={navHome}>Home</button>
                </div>
                <div className="home-page">
                    <h1>Leaderboard</h1>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ backgroundColor: "#1e1e1e", padding: "1rem"}}>
                            {userList.map(([uName, uScore, i]) => {
                                return (
                                    <LBBox index={i}
                                    userName={uName}
                                    userScore={uScore} />
                                )
                            })}
                        </div>
                        <div>
                            <SubmitBox />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LBPage