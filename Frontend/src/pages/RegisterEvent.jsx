import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/RegisterEvent.css';

const RegisterEvent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();

    // Simulate successful registration
    Swal.fire({
      title: 'Registered!',
      text: 'You have successfully registered for the event.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // Clear the form
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="register-event">
      <h1>Register for Event</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterEvent;
