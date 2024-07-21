import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Replace the URL with your backend endpoint
    axios.get(`http://localhost:5000/api/events/${eventId}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
      <p>Organizer: {event.organizer}</p>
      <button>Register</button>
    </div>
  );
};

export default EventDetails;
