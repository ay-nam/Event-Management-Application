import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserManagement.css';


const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`/api/users/${userId}`)
      .then(response => {
        // Update the user list after deletion
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleBlock = (userId) => {
    axios.post(`/api/users/${userId}/block`)
      .then(response => {
        // Update the user status after blocking
        setUsers(users.map(user => 
          user.id === userId ? { ...user, blocked: true } : user
        ));
      })
      .catch(error => console.error('Error blocking user:', error));
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.blocked ? 'Blocked' : 'Active'}</td>
              <td>
                <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
                <button onClick={() => handleBlock(user.id)} className="block-button">Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
