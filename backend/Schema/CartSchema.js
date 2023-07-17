const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  cartitem: Array,
});

module.exports = mongoose.model("cartSchema", CartSchema);
