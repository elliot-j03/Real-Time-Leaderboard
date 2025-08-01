// React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// CSS
import './index.css'
// Components
import App from './App.jsx'
import UserProvider from './components/UserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
)
