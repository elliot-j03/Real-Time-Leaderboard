// React
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// CSS
import './App.css'
// Pages
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />}/>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
