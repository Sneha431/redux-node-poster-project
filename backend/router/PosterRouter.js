const express = require("express");
const router = express.Router();
const data = require("../data/postersdata.json");
const PosterSchema = require("../Schema/PosterSchema");
require("../db/config");

const posterdata = JSON.parse(JSON.stringify(data));

const insertposterdata = router.get("/", async (req, res) => {
  try {
    await PosterSchema.create(posterdata);

    res.send("data successfully inserted");
  } catch (error) {
    res.send(error);
  }
});
// const insertposterdata = router.post("/", async (req, res) => {
//   try {
//     // await PosterSchema.create(posterdata);

//     let posterdata = new PosterSchema(req.body);
//     let data = await posterdata.bul;
//     if (data) {
//       res.send("data successfully inserted");
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });
const getallpostersall = router.get("/getallpostersall", async (req, res) => {
  try {
    let postersdata = await PosterSchema.find();
    //   console.log(JSON.parse(JSON.stringify(postersdata)));
    res.send(postersdata);
  } catch (error) {
    res.send(error);
  }
});
const getallposters = router.get("/getalldatas/:page", async (req, res) => {
  // try {
  //   let postersdata = await PosterSchema.find();
  //   //   console.log(JSON.parse(JSON.stringify(postersdata)));
  //   res.send(postersdata);
  // } catch (error) {
  //   res.send(error);
  // }
  try {
    let data = await PosterSchema.find();
    const pageSize = 10;

    const pageNumber = req.params.page; // Get the current page number from the query parameters
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const postersdata = data.slice(startIndex, endIndex);
    res.json({ postersdata, total: data.length, pageSize });
  } catch (error) {
    res.send(error);
  }
});

const getsingleposter = router.get("/getsingledata/:id", async (req, res) => {
  try {
    let imdbid = req.params.id;
    let postersdata = await PosterSchema.find({ imdbID: imdbid });
    //   console.log(JSON.parse(JSON.stringify(postersdata)));
    res.send(postersdata);
  } catch (error) {
    res.send(error);
  }
});
const getpostersbytitle = router.get(
  "/getpostersbytitle/:title",
  async (req, res) => {
    try {
      let title = req.params.title;
      if (title !== "") {
        let postersdata = await PosterSchema.find({
          Title: { $regex: title, $options: "i" },
        });

        res.send(postersdata);
      }
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = {
  insertposterdata,
  getallposters,
  getsingleposter,
  getpostersbytitle,
  getallpostersall,
};
