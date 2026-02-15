const BloodRequest = require("../models/BloodRequest");
const BloodStock = require("../models/BloodStock");

// Hospital creates request
exports.createRequest = async (req, res) => {
  try {
    const { hospitalName, bloodGroup, unitsRequired } = req.body;

    const request = await BloodRequest.create({
      hospitalName,
      bloodGroup,
      unitsRequired
    });

    res.json({ message: "Request submitted", request });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin view all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin approve request
exports.approveRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    const stock = await BloodStock.findOne({ bloodGroup: request.bloodGroup });

    if (!stock || stock.unitsAvailable < request.unitsRequired) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    stock.unitsAvailable -= request.unitsRequired;
    request.status = "Approved";

    await stock.save();
    await request.save();

    res.json({ message: "Request approved and stock updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin reject request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    request.status = "Rejected";
    await request.save();

    res.json({ message: "Request rejected" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

