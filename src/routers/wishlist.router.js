const express = require("express");
const { extend } = require("lodash");
const router = express.Router();

const { WishList } = require("../models/wishlist.model");

function wishlistMiddleware(req, res, next) {
  if (req.params) {
    console.log("Req params: ", req.params);
    console.log("Req type: ", req.method);
  }
  next();
}

router.use("/:id", wishlistMiddleware);

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

router.param("wishlistId", async (req, res, next, wishlistId) => {
  try {
    const wishlist = await WishList.findById(wishlistId);
    if (!wishlist) {
      res.json({ success: false, message: "Unable to find wishlist" });
    }
    req.wishlist = wishlist;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      errMsg: error.message,
      message: "Unable to find wishlist",
    });
  }
});

router
  .route("/:wishlistId")
  .get((req, res) => {
    try {
      let { wishlist } = req;
      res.json({ success: true, wishlist });
    } catch (error) {
      res.status(400).json({
        success: false,
        errMsg: error.message,
        message: "Unable to fetch wishlist",
      });
    }
  })
  .post(async (req, res) => {
    let { wishlist } = req;
    const updatedWishlist = req.body;

    try {
      wishlist = extend(wishlist, updatedWishlist);
      wishlist = await wishlist.save();
      res.json({ success: true, wishlist });
    } catch (error) {
      res.status(400).json({
        success: false,
        errMsg: error.message,
        message: "Unable to update wishlist",
      });
    }
  });

module.exports = router;
