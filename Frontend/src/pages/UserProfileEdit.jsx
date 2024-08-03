import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/UserProfileEdit.css';

export default function UserProfileEdit() {
  const defaultProfilePic = 'https://img.freepik.com/premium-vector/avatar-profile-pink-neon-icon-brick-wall-background-colour-neon-vector-icon_549897-254.jpg';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    profilePic: defaultProfilePic
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
        if (!token || !userId) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, profilePic: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/users/profile-update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedUser = await response.json();
      console.log('Profile updated:', updatedUser);
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully!',
        icon: 'success',
        confirmButtonText: 'Go to Profile'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user-profile');
        }
      });
    } catch (error) {
      console.error('Error updating profile:', error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Error updating profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="profile-pic-container">
          <img src={formData.profilePic} alt="Profile" className="profile-pic2" />
          <label htmlFor="profilePic" className="upload-button">ADD</label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handlePicChange}
            style={{ display: 'none' }}
          />
        </div>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
}
