import React, { useState } from 'react';
import SignupForm from './SignupForm';
import axios from 'axios';
import './signup.css';

const SignupPage = () => {
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSignup = async (username, password, mobile) => {
    try {
      // Send OTP to mobile number
      const otpResponse = await axios.post('http://localhost:5000/api/send-otp', { mobile });
      console.log(otpResponse.data.message);
      setOtpSent(true); // OTP sent successfully
      // Proceed with the rest of the signup logic
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <SignupForm onSignup={handleSignup} />
      {otpSent && <p>OTP sent to your mobile number. Please enter it to verify.</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupPage;
