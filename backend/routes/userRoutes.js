const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Only Admin can access
router.get(
  "/dashboard-stats",
  authMiddleware,
  roleMiddleware(["Admin"]),
  getDashboardStats
);

module.exports = router;
