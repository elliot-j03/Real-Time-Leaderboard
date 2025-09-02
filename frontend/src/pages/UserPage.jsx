// React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
// Components
import SearchBar from "../components/miscellaneous/SearchBar";
import LoadingSpinner from "../components/miscellaneous/LoadingSpinner";
// Functions
import { reqFriend, removeReqFriend, acceptReqFriend, removeExistingFriend } from "../scripts/friends";

function UserPage({ userData, reqData, friendsData }) {
    const navigate = useNavigate();
    const params = useParams();
    const [pageUID, setPageUID] = useState();
    const [userScore, setUserScore] = useState();
    const [userEmail, setUserEmail] = useState();

    const [requested, setRequested] = useState(false);
    const [incoming, setIncoming] = useState(false);
    const [friended, setFriended] = useState(false);

    function navLogIn() {
        navigate("/login");
    }

    function navHome() {
        navigate("/");
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

    },[params.username, userData]);

    // Determines state of friend button
    useEffect(() => {
        setRequested(false);
        setIncoming(false);

        if (reqData?.sent && reqData?.sent[pageUID]) {
            setRequested(true);
        }

        if (reqData?.incoming && reqData?.incoming[pageUID]) {
            setIncoming(true);
        }

    },[pageUID, reqData]);

    useEffect(() => {
        setFriended(false);

        if (friendsData !== null) {
            for (const uid in friendsData) {
                if (uid === pageUID) {
                    setFriended(true);
                }
            }
        }
    }, [pageUID, friendsData]);

    // Ensures button state is correct if other methods fails
    useEffect(() => {
        const uid = auth?.currentUser?.uid;
        if (uid === undefined || uid === null) {
            setRequested(false);
            setIncoming(false);
            setFriended(false);
        }
    },[auth?.currentUser?.uid]);

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
                    <p>Email: {userEmail}</p>
                    {pageUID === auth?.currentUser?.uid ? null :
                    friended ? <button className="danger-button" onClick={() => removeExistingFriend(pageUID, setFriended)}>Remove friend</button> :
                    incoming ? <button className="action-button" onClick={() => acceptReqFriend(pageUID, setIncoming)}>Accept friend</button> :
                    requested ? <button className="reg-button" onClick={() => removeReqFriend(pageUID, setRequested)}>Unsend request</button> :
                    <button className="action-button" onClick={() => reqFriend(pageUID, navLogIn, setRequested)}>Add friend</button>}
                </div>
            </>
        )
    }
}

export default UserPage;