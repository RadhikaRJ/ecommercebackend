const mongoose = require("mongoose");
const env = require("dotenv").config({ path: "./.env" });

function initializeDbConnection() {
  const mongoUri = process.env.MONGODB_CONNECTION_URI;
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`MongoDB server started at ${String(mongoUri)}`);
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
