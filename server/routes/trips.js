// routes/trips.js
const express = require('express');
const Trip = require('../models/Trip');

const router = express.Router();

router.post('/add', async (req, res) => {
  const { userId, description } = req.body;

  try {
    const newTrip = new Trip({ userId, description });
    await newTrip.save();
    res.status(201).json({ message: 'Trip added successfully' });
  } catch (error) {
    console.error('Error adding trip:', error.message);
    res.status(500).json({ message: 'Failed to add trip' });
  }
});

router.delete('/remove/:id', async (req, res) => {
  const tripId = req.params.id;

  try {
    await Trip.findByIdAndDelete(tripId);
    res.status(200).json({ message: 'Trip removed successfully' });
  } catch (error) {
    console.error('Error removing trip:', error.message);
    res.status(500).json({ message: 'Failed to remove trip' });
  }
});

module.exports = router;
