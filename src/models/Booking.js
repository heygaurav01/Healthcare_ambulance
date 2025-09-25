const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ambulanceId: { type: mongoose.Schema.Types.ObjectId, ref: "Ambulance" },
    status: {
      type: String,
      enum: ["requested", "confirmed", "completed"],
      default: "requested",
    },
    confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
