const express = require("express");

const { Product } = require("../models/product.model");

const { extend } = require("lodash");

const router = express.Router();

function productMiddleware(req, res, next) {
  if (req.params) {
    console.log("req params: ", req.params);
    console.log("req method: ", req.method);
  }
  next();
}

router.use("/:id", productMiddleware);
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

router.param("productId", async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res
        .status(400)
        .json({ success: false, errMessage: "Unable to find product by Id" });
    }
    req.product = product;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find product by ID",
      message: error.message,
    });
  }
});

router
  .route("/:productId")
  .get((req, res) => {
    try {
      const { product } = req;

      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch Product Details",
        errMsg: error.message,
      });
    }
  })
  .post(async (req, res) => {
    let { product } = req;
    const updatedProduct = req.body;
    try {
      product = extend(product, updatedProduct);
      product = await product.save();
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: error.message,
        message: "Unable to update product",
      });
    }
  });

module.exports = router;
