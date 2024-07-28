import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';


const HomePage = () => {
  const [events, setEvents] = useState([]);
  const userId = "currentUserId"; // Replace with actual logic to get the current user's ID

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/events/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const updatedEvent = await response.json();
      setEvents(events.map(event => event._id === id ? updatedEvent : event));
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };

  return (
    <div className="homepage">
      <img src="/banner.png" alt="Banner" className="homepage-banner" />
      <h1>Upcoming Events</h1>
      <div className="events-list">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div className="event-actions">
              <button onClick={() => handleLike(event._id)}>
                <img
                  src={event.likedBy.includes(userId) ? "../src/assets/heart-filled.png" : "../src/assets/heart-empty.png"}
                  alt={event.likedBy.includes(userId) ? "liked" : "not liked"}
                />
                {event.likes || 0}
              </button>
              <button onClick={() => handleComment(event._id, 'Nice event!')}>
                <img src="../src/assets/speech-bubble.png" alt="comment" />
              </button>
              <button>
                <Link to={`/event/${event._id}`} className="button">
                  <img src="../src/assets/visibility.png" alt="view details" />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
