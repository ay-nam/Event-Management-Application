// src/components/SignUpPage.jsx
import React, { useState } from 'react';
import '../styles/SignUpPage.css';
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        name,
        email,
        contactNumber,
        password,
        confirmPassword,
      });
      Swal.fire({
        title: 'Success!',
        text: 'Signup successful',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {error && <p className='error'>{error}</p>}
        <div className="input-box">
          <input 
            type="text" 
            placeholder='Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <FaEnvelope className='icon' />
        </div>
        <div className="input-box">
          <input 
            type="text" 
            placeholder='Contact number' 
            value={contactNumber} 
            onChange={(e) => setContactNumber(e.target.value)} 
            required 
          />
          <FaPhone className='icon' />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="new-password" 
          />
          <FaLock className='icon' />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Confirm Password' 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            autoComplete="new-password" 
          />
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
