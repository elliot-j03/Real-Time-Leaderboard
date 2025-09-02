// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Components
import SubmitBox from "../components/leaderboard/SubmitBox";
import Leaderboard from "../components/leaderboard/Leaderboard";
import TopThree from "../components/leaderboard/TopThreeBox";
import SearchBar from "../components/miscellaneous/SearchBar";
import Notif from "../components/miscellaneous/Notifications";
// Functions
import { posCalc } from "../scripts/positionCalc";

function LBPage({ userData, reqData }) {
    const [userList, setUserList] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const navigate = useNavigate();


    function navHome() {
        navigate("/");
    }

    function navLogIn() {
        navigate("/login");
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/leaderboard");
        } catch (err) {
            console.log("[ERROR] LeaderboardPage.jsx/logOut: " + err);
        }
    }
    const logInState = (auth.currentUser == null ? navLogIn : logOut);
    

    // Make blank leaderboard look better
    useEffect(() => {
        if (userData) {
            const udArr = posCalc(userData)
            setUserList(udArr);
        }
    }, [userData]);

    useEffect(() => {
        if (userList.length > 0) {
            setLeaders([userList[0], userList[1], userList[2]]);
        }
    }, [userList]);
    

    // Returns if there is no leaderboard data
    if (userData === null || userData === undefined) {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button onClick={navHome}>Home</button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242424", display: "flex", 
                        justifyContent: "center", padding: "1rem", flex: "5"}}>
                            <SearchBar userData={userData}/>
                    </div>
                    <div style={{ flex: "1", display: "flex", justifyContent: "end", paddingRight: "1rem"}}>
                        <button onClick={logInState} style={{ maxWidth: "10rem" }}>
                            { auth?.currentUser ? "Log Out" : "Log In"}</button>
                    </div>
                </div>
                <hr />
                <div className="home-page">
                    <h1>Leaderboard</h1>
                    <div style={{ display: "flex", flexDirection: "column"}}>
                        <h2>The leaderboard is currently empty...</h2>
                        {auth?.currentUser ? (
                            <div>
                                <SubmitBox />
                            </div>
                        ) : (
                            <div style={{ height: "2rem", display: "flex", flexDirection: "column",
                                justifyContent: "center", padding: "3rem"
                            }}>
                                <h3>Log in to add your score...</h3>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
        // Returns if there is leaderboard data
    } else {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button onClick={navHome}>Home</button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242424", display: "flex", 
                        justifyContent: "center", padding: "1rem", flex: "5"}}>
                            <SearchBar userData={userData}/>
                    </div>
                    <div style={{ flex: "1", display: "flex", justifyContent: "end", paddingRight: "1rem",
                        alignItems: "center"
                    }}>
                        <div style={{ paddingRight: "1rem"}}>
                            <Notif reqData={reqData}/>
                        </div>
                        <button onClick={logInState} style={{ maxWidth: "10rem" }}>
                            { auth?.currentUser ? "Log Out" : "Log In"}</button>
                    </div>
                </div>
                <hr />
                <div className="home-page">
                    <h1>Leaderboard</h1>
                    <div style={{ display: "flex", flexDirection: "row",
                        backgroundColor: "#1e1e1e"
                    }}>
                        <div style={{ padding: "5rem", paddingTop: "1rem", paddingBottom: "1rem",
                            display: "flex", flexDirection: "column",
                         }}>
                            <TopThree leaders={leaders} />
                            {auth?.currentUser ? (
                                <div>
                                    <SubmitBox />
                                </div>
                            ) : (
                                <div style={{ height: "2rem", display: "flex", flexDirection: "column",
                                    justifyContent: "center", padding: "3rem", alignItems: "center"
                                }}>
                                    <h3>Log in to add your score...</h3>
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Leaderboard 
                            userList={userList}
                            onItemSelect={null}
                            showGradients={true}
                            enableArrowNavigation={true}
                            displayScrollbar={true}
                            initialSelectedIndex={-1}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LBPage;