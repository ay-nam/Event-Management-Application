import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentModal from './Comment'; // Correct import path
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../styles/HomePage.css';

// Function to decode JWT
const decodeJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [comments, setComments] = useState({});
  const [userId, setUserId] = useState(null); // Initialize userId state

  useEffect(() => {
    // Decode token to get userId
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJwt(token);
      setUserId(decodedToken.userId); // Assuming the token has an 'id' field
    }

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

  const showLoginAlert = () => {
    Swal.fire({
      title: 'Login Required',
      text: 'You need to be logged in to like or comment on an event.',
      icon: 'warning',
      confirmButtonText: 'Login'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'; // Redirect to login page
      }
    });
  };

  const handleLike = async (id) => {
    if (!userId) {
      showLoginAlert();
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/events/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedEvent = await response.json();
      setEvents(events.map(event => event._id === id ? updatedEvent : event));
    } catch (error) {
      console.error('Error liking event:', error.message);
    }
  };

  const handleComment = (id) => {
    if (!userId) {
      showLoginAlert();
      return;
    }

    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  const addComment = (eventId, newComments) => {
    setComments(prevComments => ({
      ...prevComments,
      [eventId]: newComments
    }));
  };

  const deleteComment = (eventId, commentId) => {
    setComments(prevComments => ({
      ...prevComments,
      [eventId]: prevComments[eventId].filter(comment => comment.id !== commentId)
    }));
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
                  src={event.likedBy.includes(userId) ? "../src/assets/heart-fill.png" : "../src/assets/heart-empty.png"}
                  alt={event.likedBy.includes(userId) ? "liked" : "not liked"}
                />
                {event.likes }
              </button>
              <button onClick={() => handleComment(event._id)}>
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
      <CommentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        eventId={selectedEventId}
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default HomePage;
