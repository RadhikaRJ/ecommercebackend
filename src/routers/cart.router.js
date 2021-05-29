const express = require("express");
const { Cart } = require("../models/cart.model");
const { extend } = require("lodash");
const router = express.Router();

function cartMiddleware(req, res, next) {
  if (req.params) {
    console.log("the parameters in req are", req.params);
    console.log("REq type: ", req.method);
  }
  next();
}

router.use("/:id", cartMiddleware);

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

router.param("cartId", async (req, res, next, cartId) => {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      res.status(400).json({ success: false, errMsg: "cart not found" });
    }
    req.cart = cart;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not find API",
      errMsg: error.message,
    });
  }
});

router
  .route("/:cartId")
  .get((req, res) => {
    try {
      let { cart } = req;
      res.json({ success: true, cart });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to find cart",
        errMsg: error.message,
      });
    }
  })

  .post(async (req, res) => {
    let { cart } = req;
    const updatedCart = req.body;
    try {
      cart = extend(cart, updatedCart);
      cart = await cart.save();
      res.json({ success: true, cart });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "update failed",
        errMsg: error.message,
      });
    }
  });

module.exports = router;
