// React
import { useEffect, useState } from 'react';
import { onValue, ref } from "firebase/database";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Firebase
import { auth, db } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// CSS
import './App.css'
// Pages
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LBPage from './pages/LeaderboardPage';

function App() {
  const [userUID, setUserUID] = useState("");
  const [userData, setUserData] = useState("");
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userUID) => {
      setUserUID(auth?.currentUser?.uid);
    })
    return () => unsubscribe();
  }, []);

  useEffect(() => {
      const userRef = ref(db, "/users");

      const unsubscribe = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserData(data);
      })

      return () => unsubscribe();
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path={`/${userUID}`} element={<HomePage />}/>
        <Route path='/login' element={<AuthPage />}/>
        <Route path={`/leaderboard/${userUID}`} element={<LBPage userData={userData}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
