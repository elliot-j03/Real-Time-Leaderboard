// React
import { useEffect, useState } from "react";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Components
import LBBox from "./LeaderboardBox";

function TopThree({ leaders }) {
    const [currentLeaders, setCurrentLeaders] = useState([]);

    useEffect(() => {
        const newNames = leaders.map((user => user[0]));
        
        for (let i = 0; i < currentLeaders.length; i++) {
            if (!newNames.includes(currentLeaders[i][0])) {
                setCurrentLeaders([...leaders,  [currentLeaders[i][0], 0, 999]]);
                return
            }
        }
        
        setCurrentLeaders(leaders);
    }, [leaders]);

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
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative",
                overflow: "hidden"
            }}>
                <AnimatePresence>
                    {currentLeaders.map(([userName, userScore, pos]) => {
                        const isRemoved = !leaders.some(u => u[0] === userName);

                        return (
                            <motion.div 
                            key={userName}
                            layout
                            transition={{ duration: 0.3, layout: {
                                duration: 0.5
                            } }}
                            initial={{ scale: 0, x: 0 }}
                            animate={{ scale: 1, x: 0 }}
                            exit={{ scale: 0, x: 0 }}
                            style={{ paddingBottom: "1rem", zIndex: isRemoved ? 0 : 1 }}
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