const express = require("express");
const router = express.Router();

const CheckoutSchema = require("../Schema/CheckoutSchema");
require("../db/config");

const insertcheckoutdata = router.post(
  "/insertcheckoutdata",
  async (req, res) => {
    try {
      let checkout = new CheckoutSchema(req.body);
      let result = await checkout.save();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = {
  insertcheckoutdata,
};
