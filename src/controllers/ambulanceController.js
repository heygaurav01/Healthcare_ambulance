const Ambulance = require("../models/Ambulance");

// Register ambulance
exports.registerAmbulance = async (req, res) => {
  try {
    const { driverName, phone, location } = req.body;

    if (!driverName || !phone) {
      return res.status(400).json({ success: false, message: "Driver name and phone required" });
    }

    const ambulance = await Ambulance.create({ driverName, phone, location, status: "available" });

    res.status(201).json({ success: true, message: "Ambulance registered successfully", ambulance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update location
exports.updateLocation = async (req, res) => {
  try {
    const { ambulanceId, lat, lng } = req.body;

    const ambulance = await Ambulance.findByIdAndUpdate(
      ambulanceId,
      { location: { lat, lng } },
      { new: true }
    );

    if (!ambulance) return res.status(404).json({ success: false, message: "Ambulance not found" });

    res.json({ success: true, ambulance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get nearby ambulances
exports.getNearbyAmbulances = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: "Latitude and longitude required" });
    }

    // Simple proximity search using max distance (in degrees, approx)
    const maxDistance = 0.05; // ~5km radius
    const ambulances = await Ambulance.find({
      "location.lat": { $gte: lat - maxDistance, $lte: parseFloat(lat) + maxDistance },
      "location.lng": { $gte: lng - maxDistance, $lte: parseFloat(lng) + maxDistance },
      status: "available"
    });

    res.json({ success: true, ambulances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
