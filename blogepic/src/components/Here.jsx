import React from 'react';

const Hero = () => {
  return (
    <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
      <div style={{ flex: '1 1 320px' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: '#4f46e5', fontWeight: 700 }}>Modern blog experience</p>
        <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0', lineHeight: 1.2 }}>Build a beautiful blog with React and Vite.</h1>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>Your custom content is now rendering instead of the default starter template.</p>
      </div>

      <div style={{ flex: '1 1 320px', minHeight: '220px', borderRadius: '16px', background: 'linear-gradient(135deg, #4f46e5, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>
        BlogEpic Preview
      </div>
    </section>
  )
}

export default Hero