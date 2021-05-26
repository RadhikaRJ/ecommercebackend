const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: "The type of the category needs to be defined",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
