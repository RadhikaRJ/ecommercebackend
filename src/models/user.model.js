const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "username is required field",
    },
    password: {
      type: String,
      required: "User password is required field",
    },
    first_name: String,
    last_name: String,
    email: {
      type: String,
      required: "User's email Id is required field",
    },
    delivery_address: {
      home: String,
      society: String,
      lane1: String,
      lane2: String,
      state: String,
      country: String,
      pincode: Number,
      landmark: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    contact_number: {
      type: Number,

      maxLength: [10, "Contact number should have exactly 10 digits"],
      minLength: [10, "Contact number should have exactly 10 digits"],
    },
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },

    address_type: String,
    wishlist_id: { type: Schema.Types.ObjectId, ref: "Wishlist" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
