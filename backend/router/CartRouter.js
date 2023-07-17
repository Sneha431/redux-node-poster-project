const express = require("express");
const router = express.Router();

const CartSchema = require("../Schema/CartSchema");
require("../db/config");

const insertcartdata = router.post("/insertcartdata", async (req, res) => {
  try {
    let cartdata = new CartSchema(req.body);
    let result = await cartdata.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  insertcartdata,
};
