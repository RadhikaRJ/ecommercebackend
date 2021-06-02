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

const addProductToCart = async (req, res) => {
  try {
    const { id } = req.params;

    const { itemInCart_id, itemInCart_quantity } = req.body;
    console.log("productID", itemInCart_id, "quantity", itemInCart_quantity);
    const productRegistered = await Product.findById({ _id: itemInCart_id });

    if (!productRegistered) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product: The product is not registered",
      });
    }

    const userCart = await Cart.findOne({ user: id });

    const verifyIfProductExistsInCart = userCart.cart_product_list.find(
      (product) => product.itemInCart_id === itemInCart_id
    );

    if (verifyIfProductExistsInCart) {
      return res.status(200).json({
        success: false,
        message: "Product is already present in cart",
      });
    }

    const newProductToBeAddedToCart = {
      itemInCart_id: itemInCart_id,
      itemInCart_quantity: itemInCart_quantity,
    };

    const updatedProducts = [
      ...userCart.cart_product_list,
      newProductToBeAddedToCart,
    ];

    const updatedUserCartDetails = {
      user: userCart.user,
      cart_product_list: updatedProducts,
    };

    const updatedUserCart = await Cart.findOneAndUpdate(
      { _id: userCart._id },
      { new: true },
      { $set: updatedUserCartDetails }
    ).populate("cart_product_list.itemInCart_id", [
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

    res.status(200).json({ success: true, updatedUserCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
module.exports = { getCartDetailsAssociatedWithUserId, addProductToCart };
