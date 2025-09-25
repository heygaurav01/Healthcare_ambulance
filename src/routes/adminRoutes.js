const express = require("express");
const { signupAdmin, loginAdmin, confirmAmbulance } = require("../controllers/adminController");

const router = express.Router();

// Signup & login
router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

// Confirm ambulance
router.post("/confirm", confirmAmbulance);

module.exports = router;
