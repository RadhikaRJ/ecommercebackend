const mongoose = require("mongoose");

const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    wishlist_product_list: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("Wishlist", WishlistSchema);

module.exports = { WishList };
