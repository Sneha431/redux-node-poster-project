const mongoose = require("mongoose");
const WishlistSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  Poster: String,
  imdbID: String,
  price: String,
  quantity: Number,
});

module.exports = mongoose.model("wishlistSchema", WishlistSchema);
