// React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Firebase
import { auth } from "../config/firebase";
// Components
import SearchBar from "../components/miscellaneous/SearchBar";
import LoadingSpinner from "../components/miscellaneous/LoadingSpinner";

function UserPage({ userData }) {
    const navigate = useNavigate();
    const params = useParams();
    const [userScore, setUserScore] = useState();

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

    function navHome() {
        const path = auth?.currentUser?.uid !== undefined ? `/user-logged-in/${auth?.currentUser?.uid}` : "/";
        navigate(path);
    }

    useEffect(() => {
        const semidUD = Object.entries(userData).map(([ uid, details ]) => {
            return details;
        })
        const finalUD = semidUD.map(({ email, score, username }) => {
            return [username, score];
        })

        for (let i = 0; i < finalUD.length; i++) {
            if (finalUD[i][0] === params.username) {
                setUserScore(finalUD[i][1]);
                break;
            }
        }
    
    },[params.username]);

    if (params.username === ":username") {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button onClick={navHome}>Home</button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242424", display: "flex", 
                        justifyContent: "center", padding: "1rem", flex: "5"}}>
                        <SearchBar userData={userData}/>
                    </div>
                    <div style={{ flex: "1", display: "flex", justifyContent: "end", paddingRight: "1rem"}}>
                        <button onClick={logInState} style={{ maxWidth: "10rem" }}>
                            { auth?.currentUser ? "Log Out" : "Log In"}</button>
                    </div>
                </div>
                <hr/>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                    padding: "2rem"
                }}>
                    <LoadingSpinner/>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button onClick={navHome}>Home</button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242424", display: "flex", 
                        justifyContent: "center", padding: "1rem", flex: "5"}}>
                            <SearchBar userData={userData}/>
                    </div>
                    <div style={{ flex: "1", display: "flex", justifyContent: "end", paddingRight: "1rem"}}>
                        <button onClick={logInState} style={{ maxWidth: "10rem" }}>
                            { auth?.currentUser ? "Log Out" : "Log In"}</button>
                    </div>
                </div>
                <hr/>
                <div style={{ display: "flex", flexDirection: "column",
                    alignItems: "center"
                    }}>
                    <h1>{params.username}</h1>
                    <p>This player's current score is: {userScore}</p>
                </div>
            </>
        )
    }
}

export default UserPage;