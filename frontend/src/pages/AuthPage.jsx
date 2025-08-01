// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Functions
import { initUserInDB, checkUserName } from "../services/api";
// Components
import AuthInputBox from "../components/AuthInputBox";


// TODO: Make sure it somehow checks the database to see if the username is taken
function AuthPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passWordFirst, setPassWordFirst] = useState("");
    const [passWordSecond, setPassWordSecond] = useState("");
    const [credentialWarning, setCredentialWarning] = useState("");
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


    const createUser = async () => {
        if (await userNameCheck(userName) !== true) {
            if (passWordCheck(passWordFirst, passWordSecond)) {
                setCredentialWarning("");
                try {
                    await createUserWithEmailAndPassword(auth, email, passWordFirst);
                    const uid = auth.currentUser.uid
                    const response = await initUserInDB(userName, email, uid);
                    console.log("[RESPONSE] AuthPage.jsx/createUser: "+response);
                    navigate(`/${auth?.currentUser?.uid}`);
                } catch (err) {
                    const code = err.code;
                    switch (code) {
                        case "auth/email-already-exists":
                            setCredentialWarning("This email is already in use...");
                            break;
                        case "auth/invalid-email":
                            setCredentialWarning("Please enter a valid email...");
                            break;
                        case "auth/weak-password":
                            setCredentialWarning("Your password must be atleast 6 characters...");
                            break;
                        case "auth/missing-password":
                            setCredentialWarning("Please enter a password...");
                    }
                    console.log("[ERROR] AuthPage.jsx/createUser: " + err);
                }
            } else {
                setCredentialWarning("Please ensure your passwords match...");
            }
        } else {
            setCredentialWarning("That username is already taken...");
        }
    };

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, passWordFirst);
            navigate(`/${auth?.currentUser?.uid}`);
        } catch (err) {
            const code = err.code
            switch (code) {
                case "auth/invalid-credential":
                    setCredentialWarning("The email or password is incorrect...");
                    break;
            }
            console.log("[ERROR] AuthPage.jsx/logIn: " + err);
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
    }
    const authInput = (authType == "login" ? loginFull : createUserFull);
    const [buttonFunction, cardType, buttonText] = authInput;

    function returnToHome() {
        navigate("/")
    }

    return (
        <>
            <div style={{ backgroundColor: "#1e1e1e", display: "flex", 
                flexDirection: "row", justifyContent: "left", padding: "1rem"}}>
                    <button onClick={returnToHome} style={{ flex: "0.2"}}>Home</button>
            </div>
            <div className="home-page">
                <h1>Login Page</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {/* <p>{"Email: " + email}</p>
                    <p>{"Password: " + passWord}</p> */}
                    <p>{credentialWarning}</p>
                    <div>
                        <AuthInputBox
                        buttonFunction={buttonFunction} 
                        buttonText={buttonText}
                        cardType={cardType}/>
                    </div>
                    <p>No account?</p>
                    <button onClick={swapAuthType}>Swap</button>
                </div>
            </div>
        </>
    )
}

export default AuthPage