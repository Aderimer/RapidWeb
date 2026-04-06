import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const Navbar = ({ user }) => {
    


    return (
        <nav className='nav'>
            <ul>
                <li><Link to="/">Rapid Crew</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">Om RC</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                { user && <>
                    <li><Link to="/profile">Min profil</Link></li>
                    <li><button onClick={() => {
                        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {}, {
                            withCredentials: true
                        })
                        .then(() => {
                            window.location.href = '/login';
                        });
                    }}>Logg ut</button></li>
                </> }
                { !user && (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) }
            </ul>
        </nav>
    )
}

export default Navbar;