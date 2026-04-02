import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx'

import Home from './Home.jsx';
import Events from './Events.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Userstuff from './Userstuff.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Userstuff />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
