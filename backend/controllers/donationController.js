const Donation = require("../models/Donation");
const BloodStock = require("../models/BloodStock");
const User = require("../models/User");
const sendSMS = require("../utils/sendSMS"); // ✅ ADD THIS
const Notification = require("../models/Notification");

exports.donateBlood = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    const { units } = req.body;

    // Increase stock
    let stock = await BloodStock.findOne({
      bloodGroup: donor.bloodGroup
    });

    if (stock) {
      stock.unitsAvailable += units;
      await stock.save();
    } else {
      stock = await BloodStock.create({
        bloodGroup: donor.bloodGroup,
        unitsAvailable: units
      });
    }

    // Save donation
    await Donation.create({
      donorId: donor._id,
      bloodGroup: donor.bloodGroup,
      units
    });

    // ✅ CREATE NOTIFICATION
    await Notification.create({
  message: `New donation: ${donor.bloodGroup} (${units} units)`
   });
    // ✅ SEND SMS TO DONOR
    await sendSMS(
      donor.phone,
      "Thank you for donating blood! You are saving lives ❤️"
    );

    // ✅ SEND SMS TO ADMIN
    await sendSMS(
      process.env.ADMIN_PHONE,
      `New donation: ${donor.bloodGroup} (${units} units)`
    );

    res.json({
      message: "Donation successful, stock updated & SMS sent"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






exports.getDonorDashboard = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id).select("-password");

    const donations = await Donation.find({
      donorId: req.user.id
    }).sort({ date: -1 });

    const totalDonations = donations.length;

    const totalUnits = donations.reduce(
      (sum, item) => sum + item.units,
      0
    );

    res.json({
      donor,
      totalDonations,
      totalUnits,
      donations
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
