const express = require("express");
const { Cart } = require("../models/cart.model");
const { extend } = require("lodash");
const router = express.Router();
const controllers = require("../controllers/cart.controller");
const { userAuthentication } = require("../middleware/userAuthentication");
const {
  getCartDetailsAssociatedWithUserId,
  addProductToCart,
  updateProductDetailsInCart,
  removeProductFromCart,
} = controllers;

function cartMiddleware(req, res, next) {
  if (req.params) {
    console.log("the parameters in req are", req.params);
    console.log("REq type: ", req.method);
  }
  next();
}

router.use("/:id", cartMiddleware);
//get user's cart details
router.get("/", userAuthentication, getCartDetailsAssociatedWithUserId);
//add product to user's cart
router.post("/", userAuthentication, addProductToCart);
//update product in user's cart
router.post("/:id", userAuthentication, updateProductDetailsInCart);
//delete product from user's cart
router.delete("/:id", userAuthentication, removeProductFromCart);

// router
//   .route("/")
//   .get(async (req, res) => {
//     try {
//       const cart = await Cart.find({});
//       res.json({ success: true, cart });
//     } catch (error) {
//       console.log(
//         "error while fetching cart data. error message: ",
//         error.message
//       );
//       res.status(500).json({
//         success: false,
//         errMsg: "unable to fetch cart data",
//         errorMessage: error.message,
//       });
//     }
//   })

//   .post(async (req, res) => {
//     try {
//       const cart = req.body;
//       let newCart = new Cart(cart);
//       newCart = await newCart.save();
//       res.json({ success: true, newCart });
//     } catch (error) {
//       console.log(
//         "error while inserting cart data. error message: ",
//         error.message
//       );
//       res.status(500).json({
//         success: false,
//         errMsg: "unable to insert cart data",
//         errorMessage: error.message,
//       });
//     }
//   });

// router.param("cartId", async (req, res, next, cartId) => {
//   try {
//     const cart = await Cart.findOne({ _id: cartId }).populate(
//       "cart_product_list.itemInCart_id",
//       [
//         "name",
//         "description",
//         "price",
//         "offer_id",
//         "category_id",
//         "availability",
//         "fast_delivery",
//         "url",
//         "quantity",
//       ]
//     );

//     if (!cart) {
//       res.status(400).json({ success: false, errMsg: "cart not found" });
//     }
//     req.cart = cart;
//     next();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "could not find API",
//       errMsg: error.message,
//     });
//   }
// });

// router
//   .route("/:cartId")
//   .get((req, res) => {
//     try {
//       let { cart } = req;
//       res.json({ success: true, cart });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Unable to find cart",
//         errMsg: error.message,
//       });
//     }
//   })

//   .post(async (req, res) => {
//     let { cart } = req;
//     const updatedCart = req.body;
//     try {
//       cart = extend(cart, updatedCart);
//       cart = await cart.save();
//       res.json({ success: true, cart });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "update failed",
//         errMsg: error.message,
//       });
//     }
//   });

module.exports = router;
