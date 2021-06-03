const { Product } = require("../models/product.model");
const { WishList } = require("../models/wishlist.model");

const retrieveAllProductsInUserWishlist = async (req, res) => {
  try {
    const { id } = req.body;

    const userWishlist = await WishList.findOne({ user: id }).populate(
      "wishlist_product_list.product_id",
      [
        "name",
        "description",
        "price",
        "offer_id",
        "category_id",
        "availability",
        "fast_delivery",
        "url",
        "quantity",
      ]
    );
    console.log("userWishlist: ", userWishlist);
    if (!userWishlist) {
      return res.json({
        success: false,
        message: "Wishlist associated with user does not exist",
      });
    }

    res.status(200).json({ success: true, userWishlist });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errMsg: error.message,
    });
  }
};

const addProductToUserWishlist = async (req, res) => {
  try {
    const { id, product_id } = req.body;

    const verifyIfProductIsRegistered = await Product.findOne({
      _id: product_id,
    });
    if (!verifyIfProductIsRegistered) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is not registered" });
    }

    const userWishlist = await WishList.findOne({ user: id });

    const newProduct = {
      product_id,
    };
    const updatedWishlist = [...userWishlist.wishlist_product_list, newProduct];

    const userWishlistUpdatedWithProduct = {
      user: userWishlist.user,
      wishlist_product_list: updatedWishlist,
    };

    const updatedUserWishlist = await WishList.findOneAndUpdate(
      { user: id },
      { $set: userWishlistUpdatedWithProduct },
      { new: true }
    ).populate("wishlist_product_list.product_id", [
      "name",
      "description",
      "price",
      "offer_id",
      "category_id",
      "availability",
      "fast_delivery",
      "url",
      "quantity",
    ]);

    res.status(200).json({ success: true, updatedUserWishlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errMsg: error.message,
    });
  }
};

const removeProductFromUsersWishlist = async (req, res) => {};

module.exports = {
  addProductToUserWishlist,
  retrieveAllProductsInUserWishlist,
  removeProductFromUsersWishlist,
};
