import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import dummyEvents from '../data/DummyEvents';

const HomePage = () => {
  const [events] = useState(dummyEvents);

  const handleLike = (id) => {
    const updatedEvents = events.map(event => {
      if (event._id === id) {
        return { ...event, likes: event.likes + 1 };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleComment = (id, comment) => {
    const updatedEvents = events.map(event => {
      if (event._id === id) {
        return { ...event, comments: [...event.comments, comment] };
      }
      return event;
    });
    setEvents(updatedEvents);
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
                <img src="../src/assets/heart.png" alt="like" /> {event.likes}
              </button>
              <button onClick={() => handleComment(event._id, 'Nice event!')}>
                <img src="../src/assets/speech-bubble.png" alt="comment" />
              </button>
              <button><Link to={`/event/${event._id}`} className="button">
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
