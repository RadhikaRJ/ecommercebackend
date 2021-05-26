const express = require("express");
const router = express.Router();

const { Category } = require("../models/category.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const category = await Category.find({});
      res.json({ success: true, category });
    } catch (error) {
      console.log("error while fetching category data");
      res
        .status(500)
        .json({
          success: false,
          errMsg: "error while fetching category data",
          err: error.message,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const category = req.body;
      let newCategory = new Category(category);
      newCategory = await newCategory.save();
      res.json({ success: true, newCategory });
    } catch (error) {
      console.log("error while inserting category data");
      res
        .status(500)
        .json({
          success: false,
          errMsg: "error while inserting category data",
          err: error.message,
        });
    }
  });

module.exports = router;
