const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = Schema(
  {
    category_name: {
      type: String,

      required: "Category name is a required field",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
