const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  unitsRequired: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
