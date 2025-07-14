import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { keepAlive } from './utils/keepAlive'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Start keep-alive to prevent Render from sleeping
keepAlive.start()