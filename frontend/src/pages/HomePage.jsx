// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Functions
import { submitScore } from "../services/api";

function HomePage() {
    const navigate = useNavigate();
    const [proposedScore, setProposedScore] = useState(null);
    const [updatedScore, setUpdatedScore] = useState(null);

    function updateScore(e) {
        setProposedScore(e.target.value);
    }

    async function handleSubmit() {
        try {
            const scoreAsInt = Number(proposedScore)
            const token = await auth.currentUser.getIdToken();
            const response = await submitScore(scoreAsInt, token);
            if (response.status === "success") {
                setUpdatedScore(response.receivedScore);    
            } else {
                setUpdatedScore("You dont have permission to do that"); 
            }
        } catch (err) {
            console.log("[ERROR] handleSubmit: " + err)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.log("[ERROR] logOut: " + err);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <h1>Home Page</h1>
            <p>SCORE</p>
            <p>{"Proposed: "+proposedScore}</p>
            <p>{"Updated: "+updatedScore}</p>
            <input onChange={updateScore} placeholder="score"/>
            <p>{"Logged in as: " + auth?.currentUser?.email}</p>
            <button onClick={handleSubmit}>Submit Score</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default HomePage