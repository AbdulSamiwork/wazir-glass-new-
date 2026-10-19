import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeModal from './components/ThemeModal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModal />
    <App />
  </StrictMode>,
)
