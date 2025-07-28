import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassWord(e) {
        setPassWord(e.target.value);
    }

    const createUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, passWord);
        } catch (err) {
            console.log("[LOG IN ERROR]: " + err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log("[LOG OUT ERROR]: " + err);
        }
    };

    return (
        <>
        <h1>Login Page</h1>
        <div style={{ display: "flex", flexDirection: "column"}}>
            <p>{"Email: " + email}</p>
            <p>{"Password: " + passWord}</p>
            <input onChange={handleEmail} placeholder="email" style={{margin: "10px"}}/>
            <input onChange={handlePassWord} placeholder="password" style={{margin: "10px"}}/>
            <button>Send (Not Functional)</button>
            <p>No account?</p>
            <button onClick={createUser}>Create New User</button>
            <button onClick={logOut}>Log Out</button>
        </div>
        </>
    )
}

export default LoginPage