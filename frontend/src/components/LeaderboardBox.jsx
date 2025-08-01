import LBRow from "./LeaderboardRow"

function LBBox({ index, userName, userScore }) {
    return (
        <div style={{ backgroundColor: "#1e1e1e", display: "flex", flexDirection: "column" }}>
            <LBRow pos={index} user={userName} score={userScore}/>
        </div>
    )
}

export default LBBox