import React, { useState, useEffect } from 'react';
import '../styles/Comment.css';
import axios from 'axios';

const CommentModal = ({ open, onClose, eventId, comments, addComment, deleteComment }) => {
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [eventComments, setEventComments] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (userId) {
      const fetchUsername = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsername(response.data.name);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUsername();
    }
  }, [userId, token]);

  useEffect(() => {
    if (open && eventId) {
      const fetchComments = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/events/${eventId}/comments`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setEventComments(response.data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
    }
  }, [open, eventId, token]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!token) {
      alert('User not authenticated');
      return;
    }
  
    const newComment = {
      text: comment,
      user: userId, // Ensure the user field is included
    };
  
    try {
      const response = await axios.post(
        `http://localhost:4000/api/events/${eventId}/comments/create`,
        newComment,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      const createdComment = response.data;
  
      // Update local state with the comment including its _id from the backend response
      addComment(eventId, [
        ...(comments[eventId] || []),
        {
          _id: createdComment._id, // Use the backend-provided _id
          username: username,
          text: comment,
          time: 'Just now',
          isUserComment: true
        }
      ]);
  
      setEventComments(prevComments => [
        ...prevComments,
        {
          _id: createdComment._id, // Use the backend-provided _id
          username: username,
          text: comment,
          time: 'Just now',
          isUserComment: true
        }
      ]);
  
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };
  

  const handleDelete = async (commentId) => {
    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      console.log(eventComments)
      await axios.delete(`http://localhost:4000/api/events/${eventId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove the comment from the local state
      setEventComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      deleteComment(eventId, commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h3>Add a Comment</h3>
        <div className="comment-input-container">
          <input
            type="text"
            placeholder="Your Comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <button className="send-button" onClick={handleSubmit}>
            <img src="../src/assets/Send.jpg" alt="Send" />
          </button>
        </div>
        <div className="comment-container">
          
          {eventComments.map((c) => (
            <div key={c._id} className="comment">
              <p>
                <strong>{username}</strong>: {c.text}
              </p>
              <span className="comment-time">{c.time}</span>
              {c.isUserComment && (
                <button className="delete-button" onClick={() => handleDelete(c._id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
