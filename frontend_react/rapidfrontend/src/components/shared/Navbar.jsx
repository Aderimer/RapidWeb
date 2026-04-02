import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className='nav'>
            <ul>
                <li><Link to="/">Rapid Crew</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">Om RC</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;