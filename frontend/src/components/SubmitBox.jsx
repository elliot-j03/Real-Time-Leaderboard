// React
import { useState } from "react";
// Firebase
import { auth } from "../config/firebase";
// Functions
import { submitScore } from "../services/api";

function SubmitBox() {
    const [proposedScore, setProposedScore] = useState(null);
    const [updatedScore, setUpdatedScore] = useState(null);

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
                console.log("[RESPONSE] SubmitBox.jsx/handleSubmit: "+response);
            } else {
                setUpdatedScore("You dont have permission to the leaderboard..."); 
            }
        } catch (err) {
            console.log("[ERROR] SubmitBox.jsx/handleSubmit: " + err);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "1rem", paddingTop: "7rem"}}>
            <p>{"Proposed: "+proposedScore}</p>
            <input onChange={updateScore} placeholder="score"/>
            <button onClick={handleSubmit}>Submit Score</button>
        </div>
    )
}

export default SubmitBox;