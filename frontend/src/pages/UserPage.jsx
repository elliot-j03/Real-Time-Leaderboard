// React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// API
import { sendFriendRequest } from "../scripts/api";
// Components
import SearchBar from "../components/miscellaneous/SearchBar";
import LoadingSpinner from "../components/miscellaneous/LoadingSpinner";

function UserPage({ userData }) {
    const navigate = useNavigate();
    const params = useParams();
    const [pageUID, setPageUID] = useState();
    const [userScore, setUserScore] = useState();
    const [userEmail, setUserEmail] = useState();

    function navLogIn() {
            navigate("/login");
        }
    
        const logOut = async () => {
            try {
                await signOut(auth);
                navigate(`/user/${params.username}`);
            } catch (err) {
                console.log("[ERROR] LeaderboardPage.jsx/logOut: " + err);
            }
        }
        const logInState = (auth.currentUser == null ? navLogIn : logOut);

    function navHome() {
        const path = auth?.currentUser?.uid !== undefined ? `/user-logged-in/${auth?.currentUser?.uid}` : "/";
        navigate(path);
    }

    // Getting the user details for page
    useEffect(() => {
        for (const uid in userData) {
            if (userData[uid].username === params.username) {
                setPageUID(uid);
                setUserEmail(userData[uid].email);
                setUserScore(userData[uid].score);
                break;
            }
        }

    },[params.username]);

    async function reqFriend() {
        if (auth.currentUser === null || auth.currentUser === undefined) {
            console.log("please log in");
        } else {
            const loggedUID = auth.currentUser.uid;
            const token = await auth.currentUser.getIdToken();
            const response = await sendFriendRequest(token, loggedUID, pageUID);
            if (response.status === "true") {
                console.log("friend added");
            } else {
                console.log("failure");
            }
        }
    }

    if (params.username === ":username") {
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
                <hr/>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                    padding: "2rem"
                }}>
                    <LoadingSpinner/>
                </div>
            </>
        )
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
                    <div style={{ flex: "1", display: "flex", justifyContent: "end", paddingRight: "1rem"}}>
                        <button onClick={logInState} style={{ maxWidth: "10rem" }}>
                            { auth?.currentUser ? "Log Out" : "Log In"}</button>
                    </div>
                </div>
                <hr/>
                <div style={{ display: "flex", flexDirection: "column",
                    alignItems: "center", paddingTop: "1rem"
                    }}>
                    <div style={{ display: "flex", flexDirection: "row"}}>
                        <div style={{ backgroundColor: "#1e1e1e", display: "flex",
                            flexDirection: "column", justifyContent: "center",
                            padding: "1rem", borderRadius: "10px"
                        }}>
                            <img src="/src/assets/trophy_icon.png" alt="profile_pic" />
                        </div>
                        <h1 style={{ paddingLeft: "1rem"}}>{params.username}</h1>
                    </div>
                    <p>This player's current score is: {userScore}</p>
                    <button className="action-button" onClick={reqFriend}>Add friend</button>
                </div>
            </>
        )
    }
}

export default UserPage;