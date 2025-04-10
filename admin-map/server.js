// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads variables from .env

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());


// Connect to MongoDB using the URI from .env
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for markers
const markerSchema = new mongoose.Schema({
  lng: { type: Number, required: true },
  lat: { type: Number, required: true },
  name: { type: String, required: true }
});

const Marker = mongoose.model('Marker', markerSchema); // Collection will be "markers"

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(bodyParser.json());

// GET /api/markers - Returns all markers from MongoDB
app.get('/api/markers', async (req, res) => {
  try {
    const markers = await Marker.find({});
    res.json(markers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch markers.' });
  }
});

// POST /api/markers - Adds a new marker to MongoDB
app.post('/api/markers', async (req, res) => {
  const { lng, lat, name } = req.body;
  if (lng !== undefined && lat !== undefined && name) {
    try {
      const newMarker = new Marker({ lng, lat, name });
      await newMarker.save();
      res.status(201).json(newMarker);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save marker.' });
    }
  } else {
    res.status(400).json({ error: 'Invalid marker data. Ensure lng, lat, and name are provided.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
