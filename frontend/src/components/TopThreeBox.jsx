import LBBox from "./LeaderboardBox";

function TopThree({ leaders }) {
    return (
        <div style={{ paddingBottom: "1rem", display: "flex", flexDirection: "column",
            alignItems: "center"
        }}>
            <h2>Current Leaders</h2>
            {leaders.map(([userName, userScore, pos]) => {
                return (
                    <div style={{ paddingBottom: "1rem"}}>
                        <LBBox pos={pos} userName={userName} userScore={userScore} colourBoxes={true}/>
                    </div>
                )
            })}
        </div>
    )
}

export default TopThree;