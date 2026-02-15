const Notification = require("../models/Notification");

// Get all notifications
exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find().sort({ date: -1 });
  res.json(notifications);
};

// Mark as read
exports.markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "Marked as read" });
};
