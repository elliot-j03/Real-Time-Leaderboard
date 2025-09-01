// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// API
import { initUserInDB, checkUserName, backendPing } from "../scripts/api";
// Components
import ABContainer from "../components/auth/AuthBoxContainer";
import ErrorBox from "../components/miscellaneous/ErrorBox";


function AuthPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passWordFirst, setPassWordFirst] = useState("");
    const [passWordSecond, setPassWordSecond] = useState("");
    const [warning, setWarning] = useState("");
    const [authType, setAuthType] = useState("login");
    const navigate = useNavigate();

    function handleUserName(e) {
        setUserName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassWordFirst(e) {
        setPassWordFirst(e.target.value);
    }

    function handlePassWordSecond(e) {
        setPassWordSecond(e.target.value);
    }

    function passWordCheck(pFirst, pSecond) {
        if (pFirst == pSecond) {
            return true;
        }
        return false;
    }


    const userNameCheck = async (uName) => {
        const exists = await checkUserName(uName);
        return exists.success;
    }


    const backendCheck = async () => {
        try {
            return await backendPing();
        }
        catch {
            return false;
        }
    }


    const createUser = async () => {
        setWarning("");
        if (await backendCheck()) {
            if (await userNameCheck(userName) !== true) {
                if (passWordCheck(passWordFirst, passWordSecond)) {
                    try {
                        await createUserWithEmailAndPassword(auth, email, passWordFirst);
                        const uid = auth.currentUser.uid
                        const response = await initUserInDB(userName, email, uid);
                        console.log("[RESPONSE] AuthPage.jsx/createUser: "+response);
                        navigate("/");
                    } catch (err) {
                        const code = err.code;
                        switch (code) {
                            case "auth/email-already-exists":
                                setWarning("This email is already in use");
                                break;
                            case "auth/invalid-email":
                                setWarning("Please enter a valid email");
                                break;
                            case "auth/weak-password":
                                setWarning("Your password must be atleast 6 characters");
                                break;
                            case "auth/missing-password":
                                setWarning("Please enter a password");
                                break;
                        }
                        console.log("[ERROR] AuthPage.jsx/createUser: " + err);
                    }
                } else {
                    setWarning("Please ensure your passwords match");
                }
            } else {
                setWarning("That username is already taken");
            }
        } else {
            setWarning("Due to an issue with the server, you cannot create an account at the moment");
            console.log("[ERROR] AuthPage.jsx/createUser: The backend server is not running");
        }
    };

    const logIn = async () => {
        setWarning("");
        if (await backendCheck()) {
            try {
                await signInWithEmailAndPassword(auth, email, passWordFirst);
                navigate("/");
            } catch (err) {
                const code = err.code
                switch (code) {
                    case "auth/invalid-credential":
                        setWarning("The email or password is incorrect");
                        break;
                    case "auth/invalid-email":
                        setWarning("Please enter a valid email");
                        break;
                    case "auth/missing-password":
                        setWarning("Please enter a password");
                        break;
                }
                console.log("[ERROR] AuthPage.jsx/logIn: " + err);
            }
        } else {
            setWarning("Due to an issue with the server, you cannot login at the moment");
            console.log("[ERROR] AuthPage.jsx/createUser: The backend server is not running");
        }
    };

    // Lists to be mapped to auth card
    const loginInputs = [
        { key: "email", ph: "email", func: handleEmail },
        { key: "pOne", ph: "password", func: handlePassWordFirst }
    ];
    const loginFull = [logIn, loginInputs, "Login"];

    const createUserInputs = [
        { ph: "username", func: handleUserName },
        { ph: "email", func: handleEmail },
        { ph: "password", func: handlePassWordFirst },
        { ph: "confirm password", func: handlePassWordSecond }
    ];
    const createUserFull = [createUser, createUserInputs, "Create Account"];

    const swapAuthType = () => {
        setAuthType(authType == "login" ? "create" : "login");
        setWarning("");
    }
    const authInput = (authType == "login" ? loginFull : createUserFull);
    const [buttonFunction, cardType, buttonText] = authInput;

    function returnToHome() {
        navigate("/")
    }

    return (
        <>
            <div style={{ backgroundColor: "#242424", display: "flex", 
                flexDirection: "row", justifyContent: "left", padding: "1rem"}}>
                    <button onClick={returnToHome}>Home</button>
            </div>
            <hr />
            <div className="home-page">
                <h1>Login to the Leaderboard...</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{ height: "5rem" }}>
                        {warning === "" ? null : <ErrorBox errMessage={warning}/>}
                    </div>
                    <div style={{ height: "15rem", padding: "1px",
                        backgroundColor: "#1e1e1e", borderRadius: "15px",
                        display: "flex", flexDirection: "column",
                        justifyContent: "center", border: "1px solid",
                        borderColor: "#ffffff"
                    }}>
                        <ABContainer
                        authType={authType}
                        buttonFunction={buttonFunction} 
                        buttonText={buttonText}
                        cardType={cardType}/>
                    </div>
                    <p>{authType === "login" ? "No account?" : "Back to login..."}</p>
                    <button onClick={swapAuthType}>Swap</button>
                </div>
            </div>
        </>
    )
}

export default AuthPage