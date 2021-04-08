import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header style={headerStyle}>
            <h1>Astro Calendar</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/About">About</Link>
        </header>
    );
}

const headerStyle = {
    backgroundColor: 'black',
    color: 'white',
    paddingBottom: 10
}

const linkStyle = {
    color: 'white'
}

export default Header;