import React from 'react';
import '../styles/SignUpPage.css';
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Signup</h1>
        <div className="input-box">
          <input type="text" placeholder='Name' required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="email" placeholder='Email' required />
          <FaEnvelope className='icon' />
        </div>
        <div className="input-box">
          <input type="text" placeholder='Contact number' required />
          <FaPhone className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Confirm Password' required />
          <FaLock className='icon' />
        </div>
        <div className="terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <a href="#">Terms and Conditions</a></label>
        </div>
        <button type="submit">Signup</button>
        <div className="login-link">
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
