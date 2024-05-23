const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Vendor", VendorSchema);