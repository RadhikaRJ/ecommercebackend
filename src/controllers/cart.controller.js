const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");

const getCartDetailsAssociatedWithUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userCart = await Cart.findOne({ user: id }).populate(
      "cart_product_list.itemInCart_id",
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

    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: "cart associated with userID is not found.",
      });
    }

    res.status(200).send(userCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      errMsg: error.message,
    });
  }
};

module.exports = { getCartDetailsAssociatedWithUserId };
