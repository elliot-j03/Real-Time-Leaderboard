// React
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Components
import { UserContext } from "../components/UserProvider";
import LoadingSpinner from "../components/miscellaneous/LoadingSpinner";
import LBRow from "../components/leaderboard/LeaderboardRow";
import SearchBar from "../components/miscellaneous/SearchBar";
import Notif from "../components/miscellaneous/Notifications";
// Functions
import { posCalc } from "../scripts/positionCalc";


function HomePage({ userData, reqData }) {
    const [fetchedUser, setFetchedUser] = useState(false);
    const [userList, setUserList] = useState([]);
    const [userRow, setUserRow] = useState(null);
    const { userName } = useContext(UserContext);
    const navigate = useNavigate();

    // Timeout for loading spinner
    useEffect(() => {
        const timer = setTimeout(() => {
        setFetchedUser(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [userName]);

    // Log out
    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.log("[ERROR] HomePage.jsx/logOut: " + err);
        }
    };

    // Nav to log in page
    function navLogIn() {
        navigate("/login");
    }

    // Nav to leaderboard page
    function navLeaderboard() {
        navigate("/leaderboard");
    }

    const logInState = (auth.currentUser == null ? navLogIn : logOut);
    const logInStateText = (auth.currentUser == null ? "Log In" : "Log Out");

    // Sets calcs the positions of users
    useEffect(() => {
            if (userData) {
                const udArr = posCalc(userData)
                setUserList(udArr);
            }
        }, [userData]);

    // Finds user row corresponding to logged in user
    useEffect(() => {
        if (userName !== "{undefined user}") {
            for (let i = 0; i < userList.length; i++) {
                if (userList[i][0] === userName) {
                    setUserRow(userList[i]);
                    break;
                }
            }
        } else{
            setUserRow(null);
        }
    }, [userList, userName])

    // Displays while fetching the username
    if (logInState === logOut && userName === "{undefined user}" && !fetchedUser) {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button className="ghost-button"></button>
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
                    <h1>Home Page</h1>
                    <LoadingSpinner />
                </div>
            </>
        )
        // Displays if the username cannot be fetched for some reason
    } else if (logInState === logOut && userName === "{undefined user}" && fetchedUser) {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button className="ghost-button"></button>
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
                    <h1>Welcome to the leaderboard</h1>
                    <h3>{"Error fetching username" }</h3>
                    {userName === "{undefined user}" ?
                    null : <LBRow pos={"null"} user={userName} score={"null"}/>}
                    <h3>View the leaderboard to see the current ranking of other players...</h3>
                    <div style={{ paddingRight: "1rem" }}>
                            <button onClick={navLeaderboard} >View Leaderboard</button>
                    </div>
                </div>
            </>
        )
        // Displays once logged in and username is fetched successfully
    } else {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ justifyContent: "center", flex: "1", paddingLeft: "1rem" }}>
                        <div style={{ paddingRight: "1rem" }}>
                                <button className="ghost-button"></button>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242424", display: "flex", 
                        justifyContent: "center", padding: "1rem", flex: "5"}}>
                            <SearchBar userData={userData}/>
                    </div>
                    <div style={{ flex: "1", display: "flex", justifyContent: "end", paddingRight: "1rem",
                        alignItems: "center"
                    }}>
                        <div style={{ paddingRight: "1rem" }}>
                            <Notif userData={userData} reqData={reqData}/>
                        </div>
                        <button onClick={logInState} style={{ maxWidth: "10rem" }}>
                            { auth?.currentUser ? "Log Out" : "Log In"}</button>
                    </div>
                </div>
                <hr />
                <div className="home-page">
                    <h1>{userName === "{undefined user}" ? 
                    "Welcome to the leaderboard" : "Welcome " + userName}</h1>
                    { userRow === null ?
                    null : (
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <h2 style={{ paddingRight: "1rem"}}>Score: {userRow[1]}</h2>
                            <h2 style={{ paddingLeft: "1rem"}}>Position: {userRow[2]}</h2>
                        </div>
                    )
                        }
                    <h3>View the leaderboard to see the current ranking of other players...</h3>
                    <div style={{ paddingRight: "1rem" }}>
                        <button onClick={navLeaderboard} >View Leaderboard</button>
                    </div>
                </div>
            </>
        )
    }
}

export default HomePage;