import React, { useState } from 'react'
import './App.css'
import Navbar from './components/shared/Navbar';
import axios from 'axios';

function App() {
  const [user, setUser] = React.useState(null);
  const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));

  React.useEffect(() => {
      if (token) {
          const tokenValue = token.split('=')[1];
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
      }

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          withCredentials: true
      })
      .then((response) => {
          console.log(response)
          if (response.data.status === "success") {
              setUser(response.data.data);
          } else {
              setUser(null);
          }
      })
      .catch((error) => {
          console.error('Error fetching user data:', error);
          setUser(null);
      });
  }, []);

  return (
    <>
      <Navbar user={user}/>
    </>
  )
}

export default App
