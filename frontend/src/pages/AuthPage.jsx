// React
import { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Components
import AuthInputBox from "../components/AuthInputBox";

function AuthPage() {
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [authType, setAuthType] = useState("login");
    const navigate = useNavigate();



    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassWord(e) {
        setPassWord(e.target.value);
    }

    const createUser = async () => {
        try {
            // await createUserWithEmailAndPassword(auth, email, passWord);
            navigate('/');
        } catch (err) {
            console.log("[ERROR] createUser: " + err);
        }
    };

    const logIn = async () => {
        try {
            // await signInWithEmailAndPassword(auth, email, passWord);
            navigate('/');
        } catch (err) {
            console.log("[ERROR] logIn: " + err);
        }
    };

    const loginInputs = [
        { key: "email", ph: "email", func: handleEmail },
        { key: "pOne", ph: "password", func: handlePassWord }
    ];
    const loginFull = [logIn, loginInputs, "Login"];

    const createUserInputs = [
        { key: "email", ph: "email", func: handleEmail },
        { key: "pOne", ph: "password", func: handlePassWord },
        { key: "pTwo", ph: "confirm password", func: handlePassWord }
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