import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '56px',
      padding: '0 100px',
      backgroundColor: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
    }}>
      <Link to="/" className="brand-logo">Blog<span>Epic</span></Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link to="/" className="navLink">Home</Link>
        <Link to="/uploadBlog" className="navLink">Write</Link>

        {/* Theme toggle */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '4px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}
        >
          {theme === 'dark' ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-secondary) !important' }}>
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              Light
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-secondary) !important' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              Dark
            </>
          )}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userId");
            window.location.href = "/login";
          }}
          style={{
            background: 'transparent',
            border: '1px solid var(--btn-ghost-border)',
            color: 'var(--btn-ghost-color)',
            padding: '5px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;