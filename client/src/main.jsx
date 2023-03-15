import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

// axios.defaults.baseURL = 'http://164.92.178.206:5000/api'
axios.defaults.baseURL = 'http://localhost:5000/api'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)