// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Components
import AuthInputBox from "../components/AuthInputBox";

function AuthPage() {
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
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

    return (
        <>
        <h1>Login Page</h1>
        <div style={{ display: "flex", flexDirection: "column"}}>
            <p>{"Email: " + email}</p>
            <p>{"Password: " + passWord}</p>
            <div>
                <AuthInputBox 
                handleEmail={handleEmail} 
                handlePassWord={handlePassWord}
                buttonFunction={logIn}/>
            </div>
            <p>No account?</p>
            <button onClick={createUser}>Create New User</button>
        </div>
        </>
    )
}

export default AuthPage