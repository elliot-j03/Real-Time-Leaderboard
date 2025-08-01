// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
// Components
import LBBox from "../components/LeaderboardBox";

function LBPage({ userData }) {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();


    function navHome() {
        navigate(`/${auth?.currentUser?.uid}`);
    }


    useEffect(() => {
        const semidUD = Object.entries(userData).map(([ uid, details ]) => {
            return details;
        })
        const finalUD = semidUD.map(({ email, score, username }) => {
            return [username, score];
        })
        const udArr = finalUD.sort((a , b) => b[1] - a[1]);

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
            } else if (udArr[i][1] === udArr[i-1][1]) {
                littleArr.push(udArr[i][1]);
            }
        }
        
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

        let ranksArr = [];
        for (let i = 0; i < posArr.length; i++) {
            let currentItem = posArr[i];
            let rank = currentItem[0][0];
            let count = currentItem[0][1];
        
            for (let j = 0; j < count; j++) {
                ranksArr.push(rank);
            }
        }
        
        for (let i = 0; i < udArr.length; i++) {
            udArr[i].push(ranksArr[i]);
        }
        
        setUserList(udArr);
    }, [userData]);

    useEffect(() => {
        console.log(userList);
    }, [userList]);


    return (
        <div className="home-page">
            <button onClick={navHome}>Home</button>
            <h1>Leaderboard</h1>
            {userList.map(([uName, uScore, i]) => {
                return (
                    <LBBox index={i}
                    userName={uName}
                    userScore={uScore} />
                )
            })}
        </div>
    )
}

export default LBPage