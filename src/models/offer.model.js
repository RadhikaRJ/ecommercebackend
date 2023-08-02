const mongoose = require("mongoose");

const { Schema } = mongoose;

const OfferSchema = new Schema(
  {
    offer_name: {
      type: String,
      required: "The type of the category needs to be defined",
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = { Offer };
