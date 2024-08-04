import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://localhost:4000/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/api/users/delete/${userId}`)
          .then(response => {
            // Update the user list after deletion
            setUsers(users.filter(user => user._id !== userId));
            Swal.fire(
              'Deleted!',
              'The user has been deleted.',
              'success'
            );
          })
          .catch(error => console.error('Error deleting user:', error));
      }
    });
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Number of Events Registered</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => !user.isAdmin).map(user => (
            <tr key={user._id}>
              <td><img src={user.profilePic} alt="Profile" className="profile-pic" /></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>{user.eventsRegistered}</td>
              <td>{user.blocked ? 'Blocked' : 'Active'}</td>
              <td>
                <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
