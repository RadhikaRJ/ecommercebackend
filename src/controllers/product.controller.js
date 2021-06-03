const { Product } = require("../models/product.model");

const retrieveAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to fetch product data" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const addANewProduct = async (req, res) => {
  try {
    const productDetails = req.body;
    let newProduct = new Product(productDetails);
    newProduct = await newProduct.save();
    res.status(200).json({ success: true, newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const retrieveProductDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Product.findByIdAndRemove({ _id: id });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      offer_id,
      availability,
      fast_delivery,
      url,
      quantity,
    } = req.body;

    const verifyIfProductExists = await Product.findById({ _id: id });
    if (!verifyIfProductExists) {
      return res
        .status(400)
        .json({ success: false, message: "product does not exist" });
    }

    const updatedProductDetails = {
      name,
      description,
      price,
      offer_id,
      availability,
      fast_delivery,
      url,
      quantity,
    };

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: updatedProductDetails },
      { new: true }
    );

    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

module.exports = {
  retrieveAllProducts,
  addANewProduct,
  retrieveProductDetailsById,
  removeProduct,
  updateProductDetails,
};
