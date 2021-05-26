const express = require("express");

const { Category } = require("../models/category.model");

const router = express.Router();

function myLogger(req, res, next) {
  if (req.params) {
    console.log("Req params", req.params);
    console.log("Req type: ", req.method);
  }
  next();
}

router.use("/", myLogger);
router
  .route("/")
  .get(async (req, res) => {
    try {
      const category = await Category.find({});
      res.json({ success: true, category });
    } catch (err) {
      console.log("error", err.message);
      res.status(500).json({
        success: false,
        errorMsg: "Something went wrong",
        errMsg: error.message,
      });
    }
  })
  .post(async (req, res) => {
    const category = req.body;
    console.log("the category data received is", { category });
    let newCategory = new Category(category);
    try {
      newCategory = await newCategory.save();
      res.json({ success: true, newCategory });
    } catch (err) {
      console.log("error", err.message);
      res.json({
        success: false,
        errorMsg: "Something went wrong",
        errMsg: error.message,
      });
    }
  });

module.exports = router;
