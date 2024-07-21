import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Username:', username);
    console.log('Password:', password);
    // Here you can also send the data to your backend
  };

  return (
    <>
    <nav className="navbar1">
      <ul className="navbar1-links">
        <li><Link to="/">User Login</Link></li>
        <li><Link to="/admin-login">Admin Login</Link></li>
      </ul>
    </nav>

    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <FaUser className='icon' />  
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon' />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
        </div>
      </form>
    </div>
    </>
    
  );
};

export default LoginPage;
