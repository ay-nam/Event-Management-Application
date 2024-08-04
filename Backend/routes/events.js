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
    console.error('Error fetching events:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});


// Fetch event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Like an event
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    console.log(`User ${userId} is trying to like event ${eventId}`);

    const event = await Event.findById(eventId);
    if (!event) {
      console.error(`Event not found: ${eventId}`);
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log(`Event found: ${eventId}`);

     // Check if user has already liked the event
     const hasLiked = event.likedBy.includes(userId);

     // Update likes and likedBy fields
     const update = hasLiked
       ? { $inc: { likes: -1 }, $pull: { likedBy: userId } }
       : { $inc: { likes: 1 }, $addToSet: { likedBy: userId } };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, update, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error liking event:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// Add a comment
router.post('/:id/comment', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.userId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const comment = {
      text: req.body.text,
      createdAt: new Date(),
    };

    event.comments.push(comment);
    await event.save();

    res.json(event);
  } catch (error) {
    console.error('Error adding comment:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});



// Create an event
router.post('/create', async (req, res) => {
  const { title, description, image, date, time, location, organizer } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      image,
      date,
      time,
      location,
      organizer,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update an event
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, image, date, time, location, organizer } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, image, date, time, location, organizer },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an event
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
