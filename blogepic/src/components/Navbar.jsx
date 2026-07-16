import React from 'react';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#0f172a', color: '#fff' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>BlogEpic</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
            </div>
        </nav>
    )
}

export default Navbar