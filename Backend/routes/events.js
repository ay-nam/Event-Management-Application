const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authenticateToken = require('../middleware/authenticateToken');

// Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch event details by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like an event
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const userId = req.user.userId;

    if (event.likedBy.includes(userId)) {
      event.likedBy = event.likedBy.filter(id => id.toString() !== userId.toString());
    } else {
      event.likedBy.push(userId);
    }

    event.likes = event.likedBy.length;
    await event.save();

    res.json(event);
  } catch (error) {
    console.error('Error liking event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment
router.post('/:id/comment', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const comment = {
      text: req.body.text,
      createdAt: new Date(),
    };

    event.comments.push(comment);
    await event.save();

    res.json(event);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
