import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace the URL with your backend endpoint
    axios.get('http://localhost:5000/api/admin/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));

    axios.get('http://localhost:5000/api/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Events</h3>
      <div>
        {events.map(event => (
          <div key={event._id}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
      <h3>Users</h3>
      <div>
        {users.map(user => (
          <div key={user._id}>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <button>Block</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
