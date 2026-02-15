const User = require("../models/User");

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: "Donor" });
    const totalHospitals = await User.countDocuments({ role: "Hospital" });

    res.json({
      totalUsers,
      totalDonors,
      totalHospitals
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
