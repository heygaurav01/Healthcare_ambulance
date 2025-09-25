const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ambulance", ambulanceRoutes);

app.get("/", (req, res) => {
  res.send("🚑 Ambulance Booking API is running...");
});

module.exports = app;
