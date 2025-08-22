// React
import { useEffect, useState } from 'react';
import { onValue, ref, set } from "firebase/database";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Firebase
import { auth, db } from './config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
// CSS
import './App.css'
// Pages
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LBPage from './pages/LeaderboardPage';
import UserPage from './pages/UserPage';

function App() {
  const [userUID, setUserUID] = useState("");
  const [userData, setUserData] = useState("");
  // const [inactivityTimer, setInactivityTimer] = useState(null);
  
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


  // const maxInactivity = 30 * 60 * 1000
  // function resetActivityTimer() {
  //   if (inactivityTimer === null) {
  //     const timer = setTimeout(() => {
  //       signOut(auth);
  //       console.log("Signed out due to inactivity");
  //     }, maxInactivity);
  //     setInactivityTimer(timer);
  //   } else {
  //     clearTimeout(inactivityTimer);
  //   }
  // }
  
  // ["click", "mousemove", "keydown", "scroll", "touchstart"].forEach(evt => {
  //   window.addEventListener(evt, resetActivityTimer);
  // });
  // resetActivityTimer();



  return (
    <BrowserRouter>
      <Routes>
        <Route path={userUID ? `/user-logged-in=${userUID}` : "/"} element={<HomePage userData={userData} />}/>
        <Route path='/login' element={<AuthPage />}/>
        <Route path={userUID ? `/leaderboard/user-logged-in=${userUID}` : "/leaderboard/"} element={<LBPage userData={userData}/>}/>
        <Route path={userUID ? `/user/user-logged-in=${userUID}` : "/user/"} element={<UserPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
