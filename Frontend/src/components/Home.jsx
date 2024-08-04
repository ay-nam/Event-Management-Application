import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillCalendarFill, BsFillPeopleFill, BsFillBellFill, BsPlusCircle } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([]);
  const [userCount, setUserCount] = useState(0); // New state for user count
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/');
        setUserCount(response.data.length); // Assuming the response is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchEvents();
    fetchUserCount();
  }, []);

  const handleEdit = async (event) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Event',
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${event.title}">
        <input id="description" class="swal2-input" placeholder="Description" value="${event.description}">
        <input id="image" class="swal2-input" placeholder="Image URL" value="${event.image}">
        <input id="date" class="swal2-input" placeholder="Date" type="date" value="${event.date}">
        <input id="time" class="swal2-input" placeholder="Time" type="time" value="${event.time}">
        <input id="location" class="swal2-input" placeholder="Location" value="${event.location}">
        <input id="organizer" class="swal2-input" placeholder="Organizer" value="${event.organizer}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
          image: document.getElementById('image').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value,
          location: document.getElementById('location').value,
          organizer: document.getElementById('organizer').value
        };
      }
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:4000/api/events/update/${event._id}`, formValues);
        Swal.fire('Updated!', 'Event has been updated.', 'success');
        setEvents(events.map(e => (e._id === event._id ? { ...e, ...formValues } : e)));
      } catch (error) {
        console.error('Error updating event:', error);
        Swal.fire('Error!', 'Failed to update event.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/events/delete/${id}`);
      Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      Swal.fire('Error!', 'Failed to delete event.', 'error');
    }
  };

  const handleAddEvent = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Event',
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input id="description" class="swal2-input" placeholder="Description">
        <input id="image" class="swal2-input" placeholder="Image URL">
        <input id="date" class="swal2-input" placeholder="Date" type="date">
        <input id="time" class="swal2-input" placeholder="Time" type="time">
        <input id="location" class="swal2-input" placeholder="Location">
        <input id="organizer" class="swal2-input" placeholder="Organizer">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('title').value,
          description: document.getElementById('description').value,
          image: document.getElementById('image').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value,
          location: document.getElementById('location').value,
          organizer: document.getElementById('organizer').value
        };
      }
    });

    if (formValues) {
      try {
        const response = await axios.post('http://localhost:4000/api/events/create', formValues);
        Swal.fire('Added!', 'Event has been added.', 'success');
        setEvents([...events, response.data]);
      } catch (error) {
        console.error('Error adding event:', error);
        Swal.fire('Error!', 'Failed to add event.', 'error');
      }
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>EVENTS</h3>
            <BsFillCalendarFill className='card_icon' />
          </div>
          <h1>{events.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>USERS</h3>
            <BsFillPeopleFill className='card_icon' />
          </div>
          <h1>{userCount}</h1> {/* Display the user count */}
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>5</h1>
        </div>
      </div>

      <div className='event-list'>
        <div className='event-list-header'>
          <h3>Events</h3>
          <button className='add-event-button' onClick={handleAddEvent}>
            <BsPlusCircle className='icon' /> Add New Event
          </button>
        </div>
        <ul className='event-items'>
          {events.map(event => (
            <li key={event._id} className='event-item'>
              <div className='event-info'>
                <h4>{event.title}</h4>
                <p>Description: {event.description}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
                <p>Organizer: {event.organizer}</p>
              </div>
              <div className='event-actions'>
                <button className='edit-button' onClick={() => handleEdit(event)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
}

export default Home;
