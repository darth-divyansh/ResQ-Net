const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

// Define UserLocation schema and model
const UserLocationSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: 'user_locations' } // Specify collection name (optional)
);

const UserLocation = mongoose.model("UserLocation", UserLocationSchema);

// Haversine formula to calculate distance between two points on Earth
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // in kilometers
  return distance;
}

// Store user coordinates and fetch nearby hospitals
app.post("/log-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Coordinates required" });
  }

  // Save to MongoDB (UserLocation model)
  try {
    const location = new UserLocation({ latitude, longitude });
    await location.save();

    // Fetch nearby hospitals using OpenStreetMap (Nominatim API)
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=hospital&lat=${latitude}&lon=${longitude}&radius=50000`
    );

    if (response.data.length === 0) {
      return res.status(404).json({ error: "No nearby hospitals found" });
    }

    // Calculate the distance to each hospital and find the nearest
    let nearestHospital = null;
    let minDistance = Infinity;

    response.data.forEach((hospital) => {
      const hospitalLat = parseFloat(hospital.lat);
      const hospitalLon = parseFloat(hospital.lon);
      const distance = haversine(latitude, longitude, hospitalLat, hospitalLon);

      if (distance < minDistance) {
        minDistance = distance;
        nearestHospital = {
          display_name: hospital.display_name,
          lat: hospitalLat,
          lon: hospitalLon,
          distance: minDistance, // in kilometers
        };
      }
    });

    // Return the nearest hospital
    res.json({ message: "Location logged", nearestHospital });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ error: "Error saving location to database" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));


