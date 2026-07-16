import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Here'
import Fotter from './components/Fotter'

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2rem 1.5rem', background: '#f8fafc' }}>
        <Hero />

        <section style={{ marginTop: '2rem', maxWidth: '900px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome to BlogEpic</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            Your custom React page is now rendering instead of the default Vite starter screen.
          </p>
          <button
            type="button"
            style={{ marginTop: '1rem', padding: '0.75rem 1.25rem', border: 'none', borderRadius: '8px', background: '#2563eb', color: '#fff', cursor: 'pointer' }}
          >
            Get Started
          </button>
        </section>
      </main>

      <Fotter />
    </div>
  )
}

export default App
