// React
import { useState } from "react";
// Firebase
import { auth } from "../../config/firebase";
// API
import { submitScore } from "../../scripts/api";
// Components
import ErrorBox from "../miscellaneous/ErrorBox";

function SubmitBox() {
    const [proposedScore, setProposedScore] = useState("");
    const [warning, setWarning] = useState("");
    
    // TODO: Deal with empty input
    async function handleSubmit() {
        setWarning("");
        if (proposedScore !== null && proposedScore !== "") {
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
                setProposedScore("");
            } catch (err) {
                console.log("[ERROR] SubmitBox.jsx/handleSubmit: " + err);
            }
        } else {
            setWarning("Please enter a valid score");
        }
    }
    
    return (
        <div style={{ display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "1rem", paddingBottom: "2rem" }}>
            <div style={{ height: "4rem"}}>
                {warning === "" ? null : <ErrorBox errMessage={warning}/>}
            </div>
            <div style={{ padding: "1rem" }}>
                <input value={proposedScore} onChange={e => setProposedScore(e.target.value)} placeholder="score"/>
            </div>
            <button onClick={handleSubmit}>Submit Score</button>
        </div>
    )
}

export default SubmitBox;