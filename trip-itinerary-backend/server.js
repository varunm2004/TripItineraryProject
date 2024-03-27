// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Define your API endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    
    // Make a GET request to Weatherbit API
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=YOUR_API_KEY`);

    // Send the weather data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
