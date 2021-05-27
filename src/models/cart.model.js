const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    cart_product_list: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
