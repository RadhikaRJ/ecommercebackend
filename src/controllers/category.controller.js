const { Category } = require("../models/category.model");

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    if (!allCategories) {
      return res
        .status(400)
        .json({ success: false, message: "No categories found!" });
    }

    res.status(200).json({ success: true, allCategories });
  } catch (error) {
    console.log(error);
    res.json({
      succes: false,
      message: "something went wrong!",
      errMsg: error.message,
    });
  }
};

const addNewCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    let newCategory = new Category({ category_name });
    newCategory = await newCategory.save();

    res.status(200).json({ success: true, newCategory });
  } catch (error) {
    console.log(error);
    res.json({
      succes: false,
      message: "something went wrong!",
      errMsg: error.message,
    });
  }
};
const retrieveParticularCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id });
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "category not found" });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
    res.json({
      succes: false,
      message: "something went wrong!",
      errMsg: error.message,
    });
  }
};
const removeCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Category.findByIdAndRemove({ _id: id });
    res.json({ success: true, NumberOfDocumentsRemoved: result.deletedCount });
  } catch (error) {
    console.log(error);
    res.json({
      succes: false,
      message: "something went wrong!",
      errMsg: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  addNewCategory,
  retrieveParticularCategory,
  removeCategory,
};
