// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

async function fetchPlaces(city, type) {
  const encodedCity = encodeURIComponent(city);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${encodedCity}&type=${type}&key=AIzaSyABiTcuhxoQnSdiF8frfrJ643ZNHAAsdHo`;
  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the raw response data
    return response.data.results.map(place => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      type: place.types[0], 
    }));
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
      temperature: response.data.data[0].temp,
      humidity: response.data.data[0].rh,
      windSpeed: response.data.data[0].wind_spd,
      icon: response.data.data[0].weather.icon
        };

        // Fetch places data (attractions, hotels, restaurants)
    const attractions = await fetchPlaces(city, 'tourist_attraction');
    const hotels = await fetchPlaces(city, 'lodging');
    const restaurants = await fetchPlaces(city, 'restaurant');

    // Combine and send the data
    const combinedData = {
      weather: weatherData,
      attractions: attractions.map(attraction => ({
        name: attraction.name,
        address: attraction.address,
        rating: attraction.rating,
        type: attraction.type,
      })),
      hotels: hotels.map(hotel => ({
        name: hotel.name,
        address: hotel.address,
        rating: hotel.rating,
        type: hotel.type,
      })),
      restaurants: restaurants.map(restaurant => ({
        name: restaurant.name,
        address: restaurant.address,
        rating: restaurant.rating,
        type: restaurant.type,
      })),
    };


    // Send the parsed weather data back to the frontend
    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
