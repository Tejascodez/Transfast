import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensure the session cookie is sent
      });
  
      setLoading(false);
  
      if (response.ok) {
        console.log('Login successful');
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        const errorData = await response.text(); // Get response as text instead of JSON
        console.error(errorData); // Log the actual response for debugging
        setError(errorData || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Server error. Please try again later.');
      setLoading(false);
    }
  };
  
  return (
    <div className="gradient-form">
      <div className="container-login">
        <div className="left-panel">
          <div className="text-center">
            <img src={logo} alt="logo" />
            <h4>Welcome to TransFast!</h4>
          </div>
          <p>Please login to your account</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="actions">
              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Logging In...' : 'LOG IN'}
              </button>
              <Link to="/forgot-password" className="link">
                Forgot password?
              </Link>
            </div>
          </form>
          <div className="signup">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className="btn-outline">CREATE NEW</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
