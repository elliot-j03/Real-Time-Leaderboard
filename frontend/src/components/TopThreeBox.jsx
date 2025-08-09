// React
import { useState } from "react";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Components
import LBBox from "./LeaderboardBox";

function TopThree({ leaders }) {
    const [stage, setStage] = useState();


    return (
        <div style={{ paddingBottom: "1rem", display: "flex", flexDirection: "column",
            alignItems: "center"
        }}>
            <h2>Current Leaders</h2>
            <div style={{
                height: "15rem",
                width: "420px",
                padding: "2rem",
                backgroundColor: "#1e1e1e",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden"
            }}>
                <AnimatePresence>
                    {leaders.map(([userName, userScore, pos], idx) => {
                        return (
                            <motion.div 
                            key={userName}
                            layout
                            transition={{ duration: 1 }}
                            initial={{ opacity: 0, x: -400 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 400 }}
                            style={{ paddingBottom: "1rem"}}
                            >
                                <LBBox pos={pos} userName={userName} userScore={userScore} colourBoxes={true}/>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default TopThree;