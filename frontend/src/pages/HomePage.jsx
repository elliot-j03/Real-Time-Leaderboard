// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
// Functions
import { submitScore } from "../services/api";

function HomePage() {
    const navigate = useNavigate();
    const [proposedScore, setProposedScore] = useState(null);
    const [updatedScore, setUpdatedScore] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    


    function updateScore(e) {
        setProposedScore(e.target.value);
    }

    async function handleSubmit() {
        try {
            const scoreAsInt = Number(proposedScore)
            const token = await auth.currentUser.getIdToken();
            const uid = auth.currentUser.uid;
            const response = await submitScore(scoreAsInt, token, uid);
            if (response.status === "success") {
                setUpdatedScore(response.receivedScore);
                console.log("[RESPONSE] HomePage.jsx/handleSubmit: "+response);
            } else {
                setUpdatedScore("You dont have permission to do that"); 
            }
        } catch (err) {
            console.log("[ERROR] HomePage.jsx/handleSubmit: " + err);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.log("[ERROR] HomePage.jsx/logOut: " + err);
        }
    };

    function navLogIn() {
        navigate("login");
    }
    function navLeaderboard() {
        navigate(`/leaderboard/${auth?.currentUser?.uid}`);
    }

    const logInState = (auth.currentUser == null ? navLogIn : logOut);
    const logInStateText = (auth.currentUser == null ? "Log In" : "Log Out");

    return (
        <>
            <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                    <button onClick={navLeaderboard} >View Leaderboard</button>
                    <p>{"Online : " + user}</p>
                    <button onClick={logInState} style={{ flex: "0.2"}}>{logInStateText}</button>
            </div>
            <div className="home-page">
                <h1>Home Page</h1>
                <p>SCORE</p>
                <p>{"Proposed: "+proposedScore}</p>
                <p>{"Updated: "+updatedScore}</p>
                <input onChange={updateScore} placeholder="score"/>
                <p>{"Logged in as: " + auth?.currentUser?.email}</p>
                <button onClick={handleSubmit}>Submit Score</button>
            </div>
        </>
    )
}

export default HomePage