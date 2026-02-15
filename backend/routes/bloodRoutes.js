const express = require("express");
const router = express.Router();
const { updateStock, getAllStock } = require("../controllers/bloodController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Admin only
router.post(
  "/update",
  authMiddleware,
  roleMiddleware(["Admin"]),
  updateStock
);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["Admin"]),
  getAllStock
);

module.exports = router;
