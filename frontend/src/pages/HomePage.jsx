// React
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Components
import { UserContext } from "../components/UserProvider";


function HomePage() {
    const navigate = useNavigate();
    const { userName } = useContext(UserContext);

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
                <h3>View the leaderboard to see the current highest ranking players...</h3>
            </div>
        </>
    )
}

export default HomePage;