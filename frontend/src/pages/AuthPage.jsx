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
            await createUserWithEmailAndPassword(auth, email, passWord);
            navigate('/home');
        } catch (err) {
            console.log("[ERROR] createUser: " + err);
        }
    };

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, passWord);
            navigate('/home');
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

    return (
        <>
        <h1>Login Page</h1>
        <div style={{ display: "flex", flexDirection: "column"}}>
            <p>{"Email: " + email}</p>
            <p>{"Password: " + passWord}</p>
            <div>
                <AuthInputBox
                buttonFunction={buttonFunction} 
                buttonText={buttonText}
                cardType={cardType}/>
            </div>
            <p>No account?</p>
            <button onClick={swapAuthType}>Swap</button>
        </div>
        </>
    )
}

export default AuthPage