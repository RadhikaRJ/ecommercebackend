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
    contact_number: {
      type: Number,
      required: "user's contact number is required field",
      maxLength: [10, "Contact number should have exactly 10 digits"],
      minLength: [10, "Contact number should have exactly 10 digits"],
    },
    cart_id: String,
    address_type: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
