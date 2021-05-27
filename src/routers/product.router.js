const express = require("express");

const { Product } = require("../models/product.model");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const product = await Product.find({});
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: "Unable to fetch Product details",
        errorMessage: error.message,
      });
    }
  })

  .post(async (req, res) => {
    try {
      const product = req.body;
      let newProduct = new Product(product);
      newProduct = await newProduct.save();
      res.json({ success: true, newProduct });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: "Unable to insert Product details",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
