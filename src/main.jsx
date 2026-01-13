import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'

// Note: React.StrictMode intentionally double-invokes effects in development
// to help detect side effects. This may cause API calls to appear twice.
// This is expected behavior and only happens in development mode.
// In production, effects run only once. If you want to disable this behavior,
// remove <React.StrictMode> wrapper (not recommended for development).

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   
  </React.StrictMode>,
)
