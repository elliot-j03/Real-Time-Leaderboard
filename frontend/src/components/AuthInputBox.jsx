function AuthInputBox({ handleEmail, handlePassWord, buttonFunction }) {
    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <input onChange={handleEmail} placeholder="email" style={{margin: "10px"}} />
            <input onChange={handlePassWord} placeholder="password" style={{margin: "10px"}} />
            <button onClick={buttonFunction}>Log In</button>
        </div>
    )
}

export default AuthInputBox