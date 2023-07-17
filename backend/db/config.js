const mongoose = require("mongoose");

const connectDB = async () => {
 // mongoose.connect("mongodb://localhost:27017/e-commerce");
 try{ 
    mongoose.connect("mongodb+srv://snehagoswami:qKJpqN8RKQLrVzMC@e-commerce.u8yb5ht.mongodb.net/posterdata?retryWrites=true&w=majority");

console.log("connected successfully");

}
 catch(err)
 {
    console.log(err)
 }
};

connectDB();
