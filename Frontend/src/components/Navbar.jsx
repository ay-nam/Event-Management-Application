import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';
import personImage from '../assets/person.png'; 
import Swal from 'sweetalert2'; 

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate(); // Move useNavigate outside of handleLogout

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Remove token and admin status from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
  
      // Show SweetAlert2 success message
      Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirect to login page after user clicks 'OK'
        navigate('/login');
        if (onLogout) onLogout(); // Optionally call the onLogout prop function
      });
  
    } catch (error) {
      console.error('Logout error:', error);
  
      // Show SweetAlert2 error message
      Swal.fire({
        title: 'Error',
        text: 'There was an error logging out. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleProfileClick = () => {
    navigate('/user-profile'); // Navigate to the user profile page
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      // Scrolling up
      setShowNavbar(true);
    } else {
      // Scrolling down
      setShowNavbar(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
      <div className="navbar-logo">
        <Link to="/">EventSpark</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/user-profile">Profile</Link>
          </>
        ) : (
          <>
             <Link to="/about-us">About us</Link>
             <Link to="/login">Login</Link>
            <div className="profile-wrapper">
              <button className="profile-button" onClick={toggleDropdown}>
                <img src={personImage} alt="Profile" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu" >
                   <button onClick={handleProfileClick} className="dropdownbutton">View Profile</button>
                  <button onClick={handleLogout} className='dropdownbutton'>Logout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
