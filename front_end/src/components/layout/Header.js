import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
        return(
            <header data-testid="header-component" style={headerStyle}>
                <h1>Astro Calendar</h1>
                <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/About">About</Link>
            </header>
        );
}

const headerStyle = {
    backgroundColor: '#090428',
    color: '#DFF649',
    paddingBottom: 10
}

const linkStyle = {
    color: '#DFF649'
}

export default Header;