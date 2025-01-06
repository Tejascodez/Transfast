import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import logo from '../../assets/Logo1.png';
import './login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  
  // Initialize navigate hook
  const navigate = useNavigate();

  // Handle signup logic
  const handleSignup = async (e) => {
    e.preventDefault();  // Prevent form submission
  
    // Validate all fields
    if (!email || !name || !password || !mobile) {
      console.log('Please fill all fields');
      return;
    }
  
    // Mobile number validation (example for Indian mobile number)
    const mobileRegex = /^[6-9]\d{9}$/; // Validates Indian mobile numbers starting with 6-9
    if (!mobileRegex.test(mobile)) {
      console.log('Please provide a valid mobile number');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          email,
          name,
          password,
          mobile,
        }),
      });
  
      if (response.ok) {
        console.log('Signup successful');
      } else {
        const errorData = await response.json();
        console.log('Signup error:', errorData);
      }
    } catch (error) {
      console.log('Error during signup:', error);
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
          <div className="input-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
