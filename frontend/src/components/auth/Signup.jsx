import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !name || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (response.ok) {
        setSuccess('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('Error during signup. Please try again later.');
    }
  };

  return (
    <div className="gradient-form">
      <div className="container-login">
        <div className="left-panel">
          <div className="text-center">
            <img src={logo} alt="logo" />
            <h4> Welcome to TransFast!</h4>
          </div>
          <p>Create a new account</p>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="btn" onClick={handleSignup}>SIGN UP</button>
          </div>
          <div className="signup">
            <p>Already have an account?</p>
            <button className="btn-outline" onClick={() => navigate('/login')}>LOG IN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
