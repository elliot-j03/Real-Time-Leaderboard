import LBRow from "./LeaderboardRow"

function LBBox({ pos, userName, userScore, colourBoxes }) {

    return (
        <div style={{ padding: "3px", backgroundColor: (pos === 1 && colourBoxes ? "#c19a36ff" : 
            pos === 2  && colourBoxes ? "#989898ff" :
            pos === 3 && colourBoxes ? "#6c421eff" :
            "#141414ff")
        }}>
            <div style={{ backgroundColor: "#1e1e1e", display: "flex", flexDirection: "column" }}>
                <LBRow pos={pos} user={userName} score={userScore} colourBoxes={colourBoxes}/>
            </div>
        </div>
    )
}

export default LBBox