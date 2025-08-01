function LBRow({ pos, user, score }) {
    return (
        <div style={{ backgroundColor: "#1e1e1e", display: "flex", flexDirection: "row" }}>
            <p style={{ color: "red", paddingRight: "1rem" , paddingLeft: "1rem" }}>{"Position: " + pos}</p>
            <p style={{ color: "pink", paddingRight: "1rem" , paddingLeft: "1rem"  }}>{"User: " + user}</p>
            <p style={{ color: "green", paddingRight: "1rem" , paddingLeft: "1rem"  }}>{"Score: " + score}</p>
        </div>
    )
}

export default LBRow