// React
import { use, useEffect, useState } from 'react';
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
import UserPage from './pages/UserPage';

function App() {
  const [userUID, setUserUID] = useState("undefined");
  const [userData, setUserData] = useState("");
  const [reqData, setReqData] = useState("");
  const [friendsData, setFriendsData] = useState("");
  // const [inactivityTimer, setInactivityTimer] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userUID) => {
      setUserUID(auth?.currentUser?.uid);
    })
    return () => unsubscribe();
  }, []);

  // Setting up node listeners
  // User data
  useEffect(() => {
      const userRef = ref(db, "/users");

      const unsubscribeUsers = onValue(userRef, (users) => {
          const data = users.val();
          setUserData(data);
      })

      return () => {
        unsubscribeUsers();
      };
  },[]);

  // Request data
  useEffect(() => {
      const requestRef = ref(db, `/requests/${userUID}`);

      const unsubscribeReq = onValue(requestRef, (requests) => {
          const data = requests.val();
          setReqData(data);
      })

      return () => {
        unsubscribeReq();
      }
  },[userUID]);

  // Friend data
  useEffect(() => {
    const friendsRef = ref(db, `/friends/${userUID}`);

    const unsubscribeFriends = onValue(friendsRef, (friends) => {
        const data = friends.val();
        setFriendsData(data);
    })

    return () => {
      unsubscribeFriends();
    }
  },[userUID]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage userData={userData}
          reqData={reqData} />}/>
        <Route path="/login" element={<AuthPage />}/>
        <Route path="/leaderboard/" element={<LBPage userData={userData}
          reqData={reqData} />}/>
        <Route path="/user/:username/" element={<UserPage userData={userData}
          reqData={reqData} friendsData={friendsData}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
