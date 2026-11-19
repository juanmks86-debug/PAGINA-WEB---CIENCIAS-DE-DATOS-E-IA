import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navidad from './components/Navidad.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(<><App /><Navidad /></>)
