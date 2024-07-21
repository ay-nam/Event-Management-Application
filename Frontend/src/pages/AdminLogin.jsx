import React from 'react';
import '../styles/AdminLogin.css';
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Admin Login</h1>
        <div className="input-box">
          <input type="email" placeholder='Email' required />
          <FaEnvelope className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
