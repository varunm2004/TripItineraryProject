// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
<<<<<<< HEAD:trip-itinerary-backend/server.js
=======
const db = require('./config/connection');
>>>>>>> master:server/server.js

app.use(express.json());
app.use(cors());

async function fetchPlaces(city, type) {
  const encodedCity = encodeURIComponent(city);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${encodedCity}&type=${type}&key=AIzaSyABiTcuhxoQnSdiF8frfrJ643ZNHAAsdHo`;
  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the raw response data
    const places = response.data.results.map(place => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      type: place.types[0],
      photoUrl: place.photos && place.photos.length > 0
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyABiTcuhxoQnSdiF8frfrJ643ZNHAAsdHo`
        : null,
    }));

    // Filter out attractions only
    const attractions = places.filter(place => place.type === 'tourist_attraction');

    return attractions;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error.message);
    return [];
  }
}

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
<<<<<<< HEAD:trip-itinerary-backend/server.js
      temperature: response.data.data[0].temp * 1.8 + 32 + '°F',
=======
      temperature: response.data.data[0].temp * 1.8 + 32 + '°F' + ' | ' + response.data.data[0].temp + '°C',
>>>>>>> master:server/server.js
      icon: response.data.data[0].weather.icon
        };

        // Fetch places data (attractions, hotels, restaurants)
    const attractions = await fetchPlaces(city, 'tourist_attraction');
  

    // Combine and send the data
    const combinedData = {
      weather: weatherData,
      attractions: attractions.map(attraction => ({
        name: attraction.name,
        address: attraction.address,
        rating: attraction.rating + '/5',
        photo: attraction.photoUrl,
      })),
    
    };


    // Send the parsed weather data back to the frontend
    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching weather attractions data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather and attractions data' });
  }
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})

