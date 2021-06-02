const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSubSchema = new Schema(
  {
    itemInCart_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    itemInCart_quantity: {
      type: Number,
      reuired: "Quantity of item added to cart is a required field",
    },
  },
  {
    _id: false,
  }
);
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cart_product_list: [cartSubSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
