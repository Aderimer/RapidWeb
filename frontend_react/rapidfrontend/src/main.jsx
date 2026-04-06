import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
//import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import './index.css'
import App from './App.jsx'

import Home from './Home.jsx';
import Events from './Events.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import RegisterPage from './RegisterPage.jsx';
import LoginPage from './LoginPage.jsx';
import UserProfile from './components/shared/UserProfile.jsx';

createRoot(document.getElementById('root')).render(
  //<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter>
          <App />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfile />} />

          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </StrictMode>
  //</GoogleOAuthProvider>
)
