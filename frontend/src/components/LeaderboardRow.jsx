// Sorry for this :)
function LBRow({ pos, user, score , colourBoxes}) {
    return (
        <div style={{ backgroundColor: (pos === 1 && colourBoxes ? "#ffd05aff" :
            pos === 2 && colourBoxes ? "#bbbbbbff" : 
            pos === 3 && colourBoxes ? "#915827ff" : 
            "#1e1e1e") , minHeight: "70px",
         display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ backgroundColor: (pos === 1 ? "#ffd05aff" :
            pos === 2 ? "#bbbbbbff" : 
            pos === 3 ? "#915827ff" : 
            "#313131ff"), borderRadius: "15px", maxHeight: "40px",
            display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem" }}>{pos}</p>
            </div>
            <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem"  }}>{user}</p>
            <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem"  }}>{score}</p>
        </div>
    )
}

export default LBRow