import LBRow from "./LeaderboardRow"

function LBBox({ index, userName, userScore }) {
    return (
        <div style={{ padding: "3px", backgroundColor: index === 1 ? "#c19a36ff" : 
            index === 2 ? "#989898ff" :
            index === 3 ? "#6c421eff" :
            "#141414ff"
        }}>
            <div style={{ backgroundColor: "#1e1e1e", display: "flex", flexDirection: "column" }}>
                <LBRow pos={index} user={userName} score={userScore}/>
            </div>
        </div>
    )
}

export default LBBox