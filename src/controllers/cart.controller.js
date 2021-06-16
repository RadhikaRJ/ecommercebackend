const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");

const getCartDetailsAssociatedWithUserId = async (req, res) => {
  try {
    const { id } = req.body;
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
    const { id, itemInCart_id, itemInCart_quantity } = req.body;

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
      itemInCart_id,
      itemInCart_quantity,
    };

    const updatedProducts = [
      ...userCart.cart_product_list,
      newProductToBeAddedToCart,
    ];

    console.log("updatedProducts", updatedProducts);
    const updatedUserCartDetails = {
      user: userCart.user,
      cart_product_list: updatedProducts,
    };

    console.log("updatedUserCartDetails", updatedUserCartDetails);
    const updatedUserCart = await Cart.findOneAndUpdate(
      { user: id },
      { $set: updatedUserCartDetails },
      { new: true }
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

const updateProductDetailsInCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemInCart_id, itemInCart_quantity } = req.body;

    const userCart = await Cart.findOne({ user: id });

    const { cart_product_list } = userCart;

    const updatedCart = cart_product_list.map((item) => {
      if (item.itemInCart_id == itemInCart_id) {
        item.itemInCart_quantity = itemInCart_quantity;
      }
      console.log(
        "item.itemInCart_id: ",
        item.itemInCart_id,
        "item.itemInCart_quantity: ",
        item.itemInCart_quantity
      );
      return item;
    });

    const updatedUserCartDetails = {
      user: userCart.user,
      cart_product_list: updatedCart,
    };

    const updateProductQuantityInUserCart = await Cart.findOneAndUpdate(
      { user: id },
      { $set: updatedUserCartDetails },
      { new: true }
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

    res.status(200).json({ sucess: true, updateProductQuantityInUserCart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemInCart_id } = req.body;

    const userCart = await Cart.findOne({ user: id });

    const { cart_product_list } = userCart;

    const updatedCart = cart_product_list.filter((item) => {
      return item.itemInCart_id != itemInCart_id;
    });

    const updatedCartAfterProductRemoval = {
      user: userCart.user,
      cart_product_list: updatedCart,
    };

    const cartUpdatedPostRemoval = await Cart.findOneAndUpdate(
      { user: id },
      { $set: updatedCartAfterProductRemoval },
      { new: true }
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

    res.status(200).json({ success: true, cartUpdatedPostRemoval });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

module.exports = {
  getCartDetailsAssociatedWithUserId,
  addProductToCart,
  updateProductDetailsInCart,
  removeProductFromCart,
};
