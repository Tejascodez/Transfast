import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './login.css';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (!name || !password) {
      console.log("Please enter both name and password");
      return;
    }

    // You can replace the URL below with your login API endpoint
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        // Redirect or handle login success
        localStorage.setItem('token', data.token);
      } else {
        const errorData = await response.json();
        console.log('Login error:', errorData);
        // Handle error (show error message to the user)
      }
    } catch (error) {
      console.log("Error during login:", error);
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
              <button className="btn" type="submit">
                LOG IN
              </button>
              <a className="link" href="#!">
                Forgot password?
              </a>
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
