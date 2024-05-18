import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="80030410273-6b6o4532v7cs4hh8mb68lb38f1393aoo.apps.googleusercontent.com"> 
    <App />
    </GoogleOAuthProvider>;
   
  </React.StrictMode>,
)
