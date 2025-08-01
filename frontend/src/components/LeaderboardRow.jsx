function LBRow({ pos, user, score }) {
    return (
        <div style={{ backgroundColor: pos === 1 ? "#ffd05aff" :
            pos === 2 ? "#bbbbbbff" : 
            pos === 3 ? "#915827ff" : 
            "#1e1e1e",
         display: "flex", flexDirection: "row" }}>
            <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem" }}>{pos}</p>
            <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem"  }}>{user}</p>
            <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem"  }}>{score}</p>
        </div>
    )
}

export default LBRow