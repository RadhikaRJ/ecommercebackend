const express = require("express");
const { Cart } = require("../models/cart.model");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const cart = await Cart.find({});
      res.json({ success: true, cart });
    } catch (error) {
      console.log(
        "error while fetching cart data. error message: ",
        error.message
      );
      res.status(500).json({
        success: false,
        errMsg: "unable to fetch cart data",
        errorMessage: error.message,
      });
    }
  })

  .post(async (req, res) => {
    try {
      const cart = req.body;
      let newCart = new Cart(cart);
      newCart = await newCart.save();
      res.json({ success: true, newCart });
    } catch (error) {
      console.log(
        "error while inserting cart data. error message: ",
        error.message
      );
      res.status(500).json({
        success: false,
        errMsg: "unable to insert cart data",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
