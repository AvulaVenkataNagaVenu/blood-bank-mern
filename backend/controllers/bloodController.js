const BloodStock = require("../models/BloodStock");

// Add or Update Blood Stock
exports.updateStock = async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    let stock = await BloodStock.findOne({ bloodGroup });

    if (stock) {
      stock.unitsAvailable += units;
      stock.lastUpdated = Date.now();
      await stock.save();
    } else {
      stock = await BloodStock.create({
        bloodGroup,
        unitsAvailable: units
      });
    }

    res.json({ message: "Stock updated successfully", stock });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Stock
exports.getAllStock = async (req, res) => {
  try {
    const stock = await BloodStock.find();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
