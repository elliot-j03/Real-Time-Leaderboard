// React
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Components
import { UserContext } from "../components/UserProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import LBRow from "../components/LeaderboardRow";


function HomePage() {
    const [fetchedUser, setFetchedUser] = useState(false);
    const { userName } = useContext(UserContext);
    const navigate = useNavigate();

    // Timeout for loading spinner
    useEffect(() => {
        const timer = setTimeout(() => {
        setFetchedUser(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [userName]);

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.log("[ERROR] HomePage.jsx/logOut: " + err);
        }
    };

    function navLogIn() {
        navigate("login");
    }
    function navLeaderboard() {
        const path = auth?.currentUser?.uid !== undefined ? `/leaderboard/${auth?.currentUser?.uid}` : "/leaderboard";
        navigate(path);
    }

    const logInState = (auth.currentUser == null ? navLogIn : logOut);
    const logInStateText = (auth.currentUser == null ? "Log In" : "Log Out");

    
    if (logInState === logOut && userName === "{undefined user}" && !fetchedUser) {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                    flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                        <div style={{ paddingRight: "1rem" }}>
                            <button onClick={navLeaderboard} >View Leaderboard</button>
                        </div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <button onClick={logInState} style={{ flex: "0.2"}}>{logInStateText}</button>
                        </div>
                </div>
                <div className="home-page">
                    <h1>Home Page</h1>
                    <LoadingSpinner />
                </div>
            </>
        )
    } else if (logInState === logOut && userName === "{undefined user}" && fetchedUser) {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                    flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                        <div style={{ paddingRight: "1rem" }}>
                            <button onClick={navLeaderboard} >View Leaderboard</button>
                        </div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <button onClick={logInState} style={{ flex: "0.2"}}>{logInStateText}</button>
                        </div>
                </div>
                <div className="home-page">
                    <h1>Home Page</h1>
                    <h2>{"Error fetching username" }</h2>
                    {userName === "{undefined user}" ?
                    null : <LBRow pos={1} user={userName} score={"TEMP"}/>}
                    <h3>View the leaderboard to see the current ranking of other players...</h3>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                    flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                        <div style={{ paddingRight: "1rem" }}>
                            <button onClick={navLeaderboard} >View Leaderboard</button>
                        </div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <button onClick={logInState} style={{ flex: "0.2"}}>{logInStateText}</button>
                        </div>
                </div>
                <div className="home-page">
                    <h1>Home Page</h1>
                    <h2>{userName === "{undefined user}" ? 
                    "Log in to add your score!" : "Welcome " + userName}</h2>
                    {userName === "{undefined user}" ?
                    null : <LBRow pos={1} user={userName} score={"TEMP"}/>}
                    <h3>View the leaderboard to see the current ranking of other players...</h3>
                </div>
            </>
        )
    }
}

export default HomePage;