const Admin = require("../models/Admin");
const Booking = require("../models/Booking");
const { getIO } = require("../config/socket");

// Admin signup
exports.signupAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const admin = await Admin.create({ name, email, password, role });

    res.status(201).json({ success: true, message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Confirm Ambulance
exports.confirmAmbulance = async (req, res) => {
  try {
    const { bookingId, ambulanceId, adminId, userId } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { ambulanceId, status: "confirmed", confirmedBy: adminId },
      { new: true }
    ).populate("ambulanceId");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Emit confirmation to user
    getIO().to(userId).emit("ambulance_confirmed", booking);

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
