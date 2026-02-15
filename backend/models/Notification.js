const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: String,
  read: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
