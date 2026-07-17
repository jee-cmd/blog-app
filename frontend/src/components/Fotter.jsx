import React from 'react';
import { Link } from 'react-router-dom';

const Fotter = () => {
  return (
    <footer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '56px',
      padding: '0 100px',
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--bg)',
    }}>
      <span className="brand-logo" style={{ fontSize: '1rem' }}>Blog<span>Epic</span></span>
      <p style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>© 2024 BlogEpic. All rights reserved.</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-tertiary)', fontSize: '12px', textDecoration: 'none' }}>Home</Link>
        <Link to="/uploadBlog" style={{ color: 'var(--text-tertiary)', fontSize: '12px', textDecoration: 'none' }}>Write</Link>
      </div>
    </footer>
  );
};

export default Fotter;