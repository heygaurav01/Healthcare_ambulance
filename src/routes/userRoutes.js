const express = require("express");
const {
  signupUser,
  requestAmbulance,
  getTrackingDetails,
} = require("../controllers/userController");

const router = express.Router();

// Signup
router.post("/signup", signupUser);

// Request ambulance
router.post("/request", requestAmbulance);

// Get tracking details
router.get("/tracking/:bookingId", getTrackingDetails);

module.exports = router;
