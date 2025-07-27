import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handlePassWord(e) {
    setPassWord(e.target.value);
  }

  const loginDetails = [userName, passWord]

  return (
    <>
      <h1>Login Page</h1>
      <div style={{ display: "flex", flexDirection: "column"}}>
        <p>{"User: " + userName}</p>
        <p>{"Password: " + passWord}</p>
        <input onChange={handleUserName} placeholder="username" style={{margin: "10px"}}/>
        <input onChange={handlePassWord} placeholder="password" style={{margin: "10px"}}/>
        <button>Send (Not Functional)</button>
      </div>
    </>
  )
}

export default App
