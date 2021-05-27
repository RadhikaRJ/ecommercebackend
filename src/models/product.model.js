const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: "the product name is a required field",
    },
    description: {
      type: String,
      required: "Product description is a required field",
      minLength: [
        25,
        "minimum 25 charachters are needed in the prodcut description details",
      ],
    },
    price: {
      type: Number,
      required: "price of product is a required field",
    },
    offer_id: {
      offer_type: { type: Schema.Types.ObjectId, ref: "Offer" },
    },
    category_id: {
      category_type: { type: Schema.Types.ObjectId, ref: "Category" },
    },
    availability: {
      type: Boolean,
      required: "Availability of product is required product detail",
    },
    fast_delivery: {
      type: Boolean,
      required: "Delivery speed of product is required product detail",
    },
    url: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
