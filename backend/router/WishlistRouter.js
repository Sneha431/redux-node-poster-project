const express = require("express");
const router = express.Router();

const WishlistSchema = require("../Schema/WishlistSchema");
require("../db/config");

const insertwishlistdata = router.post(
  "/insertwishlistdata",
  async (req, res) => {
    let wishlistdataexist = await WishlistSchema.find({
      imdbID: { $exists: true },
    });

    if (wishlistdataexist) {
      let wishlistdata = await WishlistSchema.find({ imdbID: req.body.imdbID });

      if (Object.keys(wishlistdata).length === 0) {
        let schemadata = new WishlistSchema(req.body);
        let result = await schemadata.save();

        res.send(result);
      } else {
        res.send({ msg: "Already Exists In Wishlist" });
      }
    }
  }
);
// const fetchwishlistdetails = router.get(
//   "/fetchwishlistdetails",
//   async (req, res) => {
//     try {
//       //let imdbid = req.params.imdbid;
//       let result = await WishlistSchema.find();
//       res.send(result);
//     } catch (error) {
//       res.send(error);
//     }
//   }
// );
const fetchwishlistdetails = router.get(
  "/fetchwishlistdetails/:page",
  async (req, res) => {
    // try {
    //   let postersdata = await PosterSchema.find();
    //   //   console.log(JSON.parse(JSON.stringify(postersdata)));
    //   res.send(postersdata);
    // } catch (error) {
    //   res.send(error);
    // }
    try {
      let result = await WishlistSchema.find();
      const pageSize = 4;

      const pageNumber = req.params.page; // Get the current page number from the query parameters
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const wishlistresultsdata = result.slice(startIndex, endIndex);
      res.json({ wishlistresultsdata, total: result.length, pageSize });
    } catch (error) {
      res.send(error);
    }
  }
);
const fetchwishlistdetailsall = router.get(
  "/fetchwishlistdetailsall",
  async (req, res) => {
    try {
      let postersdata = await WishlistSchema.find();

      res.json({ postersdata, total: postersdata.length });
    } catch (error) {
      res.send(error);
    }
  }
);

const removewishlistdetails = router.delete(
  "/removewishlistdetails/:id",
  async (req, res) => {
    try {
      //let imdbid = req.params.imdbid;
      let result = await WishlistSchema.deleteOne({
        _id: req.params.id,
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
);
module.exports = {
  insertwishlistdata,
  fetchwishlistdetails,
  removewishlistdetails,
  fetchwishlistdetailsall,
};
