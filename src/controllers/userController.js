const Booking = require("../models/Booking");
const User = require("../models/User");
const { getIO } = require("../config/socket");

// Signup user
exports.signupUser = async (req, res) => {
  try {
    const { name, phone, password, location } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Phone already registered" });
    }

    const user = await User.create({ name, phone, password, location });

    res.status(201).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Request ambulance
exports.requestAmbulance = async (req, res) => {
  try {
    const { userId, location } = req.body;

    const booking = await Booking.create({ userId, status: "requested" });

    // Emit to admins via Socket.IO
    getIO().to("admins").emit("new_request", { bookingId: booking._id, userId, location });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tracking details
exports.getTrackingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("ambulanceId");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
