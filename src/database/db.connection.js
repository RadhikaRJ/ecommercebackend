const mongoose = require("mongoose");
const env = require("dotenv").config({ path: "./.env" });
console.log(env);
function initializeDbConnection() {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to Mongoose successful"))
    .catch((err) =>
      console.log("connection failed. Error message: ", err.message)
    );
}

module.exports = { initializeDbConnection };

// const WishlistSchema = new Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   products: [{ productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product'}, active:Boolean }]
// });

// wishlist = await wishlist.findOne({userId: req.params}).populate("products.productId").execPopulate();
