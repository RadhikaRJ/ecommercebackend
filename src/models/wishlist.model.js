const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishlistSubschema = new Schema(
  {
    product_id: String,
  },
  {
    _id: false,
  }
);

const WishlistSchema = new Schema(
  {
    wishlist_product_list: [wishlistSubschema],
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("Wishlist", WishlistSchema);

module.exports = { WishList };
