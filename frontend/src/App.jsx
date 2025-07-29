// React
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// CSS
import './App.css'
// Pages
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LBPage from './pages/LeaderboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<AuthPage />}/>
        <Route path='/leaderboard' element={<LBPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
