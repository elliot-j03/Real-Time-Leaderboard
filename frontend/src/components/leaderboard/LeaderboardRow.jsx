// Sorry for this :)
function LBRow({ pos, user, score , colourBoxes}) {
    if (colourBoxes) {
        return(
            <div style={{ backgroundColor: (pos === 1 ? "#ffd05aff" :
                pos === 2 && colourBoxes ? "#bbbbbbff" : 
                pos === 3 && colourBoxes ? "#915827ff" : "#1e1e1e"), 
                minHeight: "70px", display: "flex", flexDirection: "row", 
                alignItems: "center", borderRadius: "10px", justifyContent: "center",
                paddingLeft: "0.5rem", paddingRight: "0.5rem", minWidth: "350px"
            }}>
                <div style={{ backgroundColor: (pos === 1 ? "#ebbd48ff" : 
                    pos === 2 ? "#adadadff" : "#845023ff"),
                    borderRadius: "15px", maxHeight: "40px", maxWidth: "40px",
                    display: "flex", flexDirection: "column", justifyContent: "center", flex: 1
                }}>
                    <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem" }}>{pos}</p>
                </div>
                <div style={{flex: 2, display: "flex", justifyContent: "center", 
                    paddingLeft: "0.5rem", paddingRight: "0.5rem"
                }}>
                    <p style={{ color: "white", fontSize: 20, fontWeight: "bold"
                    }}>{user}</p>
                </div>
                <div style={{ backgroundColor: (pos === 1 ? "#ebbd48ff" : 
                    pos === 2 ? "#adadadff" : "#845023ff"),
                    flex: 1, display: "flex", justifyContent: "center", alignItems: "center", 
                    maxWidth: "40px", borderRadius: "15px", maxHeight: "40px"
                }}>
                    <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem" }}>{score}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ backgroundColor: "#1e1e1e", 
                minHeight: "70px", display: "flex", flexDirection: "row", 
                alignItems: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem",
                borderRadius: "10px", justifyContent: "center", minWidth: "350px"
            }}>
                <div style={{ backgroundColor: (pos === 1 ? "#ffd05aff" :
                    pos === 2 ? "#bbbbbbff" : 
                    pos === 3 ? "#915827ff" : 
                    "#313131ff"), borderRadius: "15px", maxHeight: "40px", maxWidth: "40px",
                    display: "flex", flexDirection: "column", justifyContent: "center", flex: 1
                }}>
                    <p style={{ color: "white", paddingRight: "1rem" , paddingLeft: "1rem" }}>{pos}</p>
                </div>
                <div style={{flex: 2, display: "flex", justifyContent: "center"
                }}>
                    <p style={{ color: "white",
                        fontSize: 20, fontWeight: "bold"
                    }}>{user}</p>
                </div>
                <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center",
                    backgroundColor: "#49674dff", 
                    maxWidth: "40px", borderRadius: "15px", maxHeight: "40px"
                }}>
                    <p style={{ color: "white" }}>{score}</p>
                </div>
            </div>
        )
    }
}

export default LBRow