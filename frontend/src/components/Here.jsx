import React from 'react';

const Hero = () => {
  return (
    <div style={{
      padding: '72px 100px 56px',
      borderBottom: '1px solid var(--border)',
    }}>
      <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Blog Platform
      </p>
      <h1 style={{ fontSize: '42px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.15, maxWidth: '560px', marginBottom: '20px' }}>
        Ideas worth reading.<br />Written by real people.
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.7, marginBottom: '32px' }}>
        Discover programming insights, tutorials, and stories from developers around the world.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <a href="/uploadBlog" className="btnNormal" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Write a blog
        </a>
        <button className="btnWhite">Explore</button>
      </div>
    </div>
  );
};

export default Hero;