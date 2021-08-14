const { Product } = require("../models/product.model");
const { WishList } = require("../models/wishlist.model");

const retrieveAllProductsInUserWishlist = async (req, res) => {
  try {
    const id = req.user;

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
    const { product_id } = req.body;
    const id = req.user;
    const verifyIfProductIsRegistered = await Product.findOne({
      _id: product_id,
    });
    if (!verifyIfProductIsRegistered) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is not registered" });
    }

    const userWishlist = await WishList.findOne({ user: id });
    console.log("userWishlist: ", userWishlist);
    const newProduct = {
      product_id,
    };

    const updatedWishlist = [...userWishlist.wishlist_product_list, newProduct];
    console.log("updatedWishlist: ", updatedWishlist);
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

const removeProductFromUsersWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    const id = req.user;
    const userWishlist = await WishList.findOne({ user: id });
    const { wishlist_product_list } = userWishlist;

    const userWishListWithProductRemoved = wishlist_product_list.filter(
      (item) => {
        return item.product_id != product_id;
      }
    );

    const updatedWishlist = {
      user: userWishlist.user,
      wishlist_product_list: userWishListWithProductRemoved,
    };

    const updatedUserWishlist = await WishList.findOneAndUpdate(
      { user: id },
      { $set: updatedWishlist },
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

    res.json({ success: true, updatedUserWishlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errMsg: error.message,
    });
  }
};

module.exports = {
  addProductToUserWishlist,
  retrieveAllProductsInUserWishlist,
  removeProductFromUsersWishlist,
};
