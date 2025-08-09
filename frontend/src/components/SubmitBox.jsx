// React
import { useState } from "react";
// Firebase
import { auth } from "../config/firebase";
// API
import { submitScore } from "../scripts/api";
// Components
import ErrorBox from "./ErrorBox";

function SubmitBox() {
    const [proposedScore, setProposedScore] = useState(null);
    const [warning, setWarning] = useState("");

    function updateScore(e) {
        setProposedScore(e.target.value);
    }
    
    // TODO: Deal with empty input
    async function handleSubmit() {
        try {
            const scoreAsInt = Number(proposedScore)
            const token = await auth.currentUser.getIdToken();
            const uid = auth.currentUser.uid;
            const response = await submitScore(scoreAsInt, token, uid);
            if (response.status === "success") {
                setWarning("");
                console.log("[RESPONSE] SubmitBox.jsx/handleSubmit: "+response);
            } else {
                setWarning("You dont have permission to do that"); 
            }
        } catch (err) {
            console.log("[ERROR] SubmitBox.jsx/handleSubmit: " + err);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "1rem", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <div style={{ padding: "1rem" }}>
                <input onChange={updateScore} placeholder="score"/>
            </div>
            <button onClick={handleSubmit}>Submit Score</button>
            {warning === "" ? null : <ErrorBox errMessage={warning}/>}
        </div>
    )
}

export default SubmitBox;