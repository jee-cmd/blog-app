import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pwd })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => { window.location.href = "/"; }, 200);
      } else {
        setError(data.msg);
      }
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--auth-bg)',
    }}>
      <form onSubmit={submitForm} style={{
        width: '360px',
        backgroundColor: 'var(--auth-card)',
        borderRadius: '8px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid var(--auth-card-border)',
      }}>
        <Link to="/" className="brand-logo" style={{ fontSize: '1.5rem', marginBottom: '28px' }}>
          Blog<span>Epic</span>
        </Link>

        <div style={{ width: '100%' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '12px', marginBottom: '4px' }}>Email</p>
          <div className="inputBox">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '12px', marginBottom: '4px' }}>Password</p>
          <div className="inputBox">
            <input onChange={(e) => setPwd(e.target.value)} value={pwd} type="password" placeholder="Password" required />
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '16px' }}>
            Don't have an account?{' '}
            <Link to="/signUp" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Sign Up</Link>
          </p>
          {error && <p style={{ fontSize: '13px', color: '#f87171', marginTop: '8px', marginBottom: '4px' }}>{error}</p>}

          <button className="btnNormal" style={{ width: '100%', marginTop: '20px' }}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;