const express = require("express");

const router = express.Router();

const { WishList } = require("../models/wishlist");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const wishlistItems = await WishList.find({});
      res.json({ success: true, wishlistItems });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "unable to retrieve wishlist data",
        errMsg: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const wishlistItems = req.body;
      let newWishlistItems = new WishList(wishlistItems);
      newWishlistItems = await newWishlistItems.save();
      res.json({ success: true, newWishlistItems });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "unable to insert wishlist data",
        errMsg: error.message,
      });
    }
  });

module.exports = router;
