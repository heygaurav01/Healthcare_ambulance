const express = require("express");
const {
  registerAmbulance,
  updateLocation,
  getNearbyAmbulances
} = require("../controllers/ambulanceController");

const router = express.Router();

// Register ambulance
router.post("/register", registerAmbulance);

// Update ambulance location
router.post("/location", updateLocation);

// Get nearby ambulances
router.get("/nearby", getNearbyAmbulances);

module.exports = router;
