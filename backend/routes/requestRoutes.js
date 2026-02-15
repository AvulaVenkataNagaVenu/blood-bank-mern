const express = require("express");
const router = express.Router();
const {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest
} = require("../controllers/requestController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Hospital can create request
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["Hospital"]),
  createRequest
);

// Admin view requests
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["Admin"]),
  getAllRequests
);

// Admin approve
router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  approveRequest
);

// Admin reject
router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  rejectRequest
);

module.exports = router;
