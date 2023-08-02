const express = require("express");
const { extend } = require("lodash");
const router = express.Router();
const controllers = require("../controllers/wishlist.controller");
const { userAuthentication } = require("../middleware/userAuthentication");
const {
  addProductToUserWishlist,
  retrieveAllProductsInUserWishlist,
  removeProductFromUsersWishlist,
} = controllers;
const { WishList } = require("../models/wishlist.model");

function wishlistMiddleware(req, res, next) {
  if (req.params) {
    console.log("Req params: ", req.params);
    console.log("Req type: ", req.method);
  }
  next();
}

router.use("/:id", wishlistMiddleware);

router.get("/", userAuthentication, retrieveAllProductsInUserWishlist);
router.post("/", userAuthentication, addProductToUserWishlist);
router.delete("/", userAuthentication, removeProductFromUsersWishlist);

module.exports = router;
