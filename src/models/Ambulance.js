const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema(
  {
    driverName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    status: { type: String, enum: ["available", "busy"], default: "available" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ambulance", ambulanceSchema);
