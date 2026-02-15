const mongoose = require("mongoose");

const bloodStockSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    unique: true
  },
  unitsAvailable: {
    type: Number,
    required: true,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("BloodStock", bloodStockSchema);
