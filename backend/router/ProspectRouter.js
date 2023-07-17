const express = require("express");
const router = express.Router();

const ProspectSchema = require("../Schema/ProspectSchema");
require("../db/config");

const insertprospectdata = router.post(
  "/insertprospectdata",
  async (req, res) => {
    try {
      let prospect = new ProspectSchema(req.body);
      let result = await prospect.save();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
);
const updateprospectdata = router.put(
  "/updateprospectdata/:id",
  async (req, res) => {
    try {
      let updatedprospect = req.body;
      let result = await ProspectSchema.updateOne(
        { _id: req.params.id },
        { $set: updatedprospect }
      );

      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = {
  insertprospectdata,
  updateprospectdata,
};
