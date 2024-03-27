// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Define your API endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    
    // Make a GET request to Weatherbit API
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=56b3e7eef82942e2aab04de5bad338a3`);

    // Parse the response
    const weatherData = {
      city: response.data.data[0].city_name,
      country: response.data.data[0].country_code,
      description: response.data.data[0].weather.description,
      temperature: response.data.data[0].temp,
      humidity: response.data.data[0].rh,
      windSpeed: response.data.data[0].wind_spd,
      icon: response.data.data[0].weather.icon
    };

    // Send the parsed weather data back to the frontend
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
