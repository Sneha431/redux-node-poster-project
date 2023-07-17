const mongoose = require("mongoose");
const prospectSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  shippingAddress1: String,
  shippingAddress2: String,
  shippingCountry: String,
  shippingCity: String,
  shippingState: String,
  shippingZip: String,
});

module.exports = mongoose.model("ProspectSchema", prospectSchema);
