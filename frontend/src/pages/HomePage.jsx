// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
// Functions


function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

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
        navigate(`/leaderboard/${auth?.currentUser?.uid}`);
    }

    const logInState = (auth.currentUser == null ? navLogIn : logOut);
    const logInStateText = (auth.currentUser == null ? "Log In" : "Log Out");

    return (
        <>
            <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                flexDirection: "row", justifyContent: "end", padding: "1rem"}}>
                    <button onClick={navLeaderboard} >View Leaderboard</button>
                    <p>{"Online : " + user}</p>
                    <button onClick={logInState} style={{ flex: "0.2"}}>{logInStateText}</button>
            </div>
            <div className="home-page">
                <h1>Home Page</h1>
                <h2>{"Welcome " + auth?.currentUser?.email}</h2>
                <h3>View the leaderboard to see the current highest ranking players...</h3>
            </div>
        </>
    )
}

export default HomePage;