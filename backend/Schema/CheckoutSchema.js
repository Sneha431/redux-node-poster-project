const mongoose = require("mongoose");
const CheckoutSchema = new mongoose.Schema({
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
  orderId: String,
  cartitem: Array,
  prospectid: String,
});

module.exports = mongoose.model("checkoutSchema", CheckoutSchema);
