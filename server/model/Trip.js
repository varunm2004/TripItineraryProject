// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tripApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the Trip schema
const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  }
});

// Create the Trip model
const Trip = mongoose.model('Trip', tripSchema);

// Set up Express app
const app = express();
app.use(bodyParser.json());

// Define routes
// Route to create a new trip
app.post('/trips', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).send(newTrip);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all trips
app.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).send(trips);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
