const express = require("express");
const router = express.Router();

const {
  donateBlood,
  getDonorDashboard
} = require("../controllers/donationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Donate
router.post(
  "/donate",
  authMiddleware,
  roleMiddleware(["Donor"]),
  donateBlood
);

// Donor dashboard data
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["Donor"]),
  getDonorDashboard
);

module.exports = router;
