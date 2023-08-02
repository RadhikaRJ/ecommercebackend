const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { Category } = require("../models/category.model");
const controllers = require("../controllers/category.controller");
const {
  getAllCategories,
  addNewCategory,
  retrieveParticularCategory,
  removeCategory,
} = controllers;

function categoryMiddleware(req, res, next) {
  if (req.params) {
    console.log("req params: ", req.params);
    console.log("req type: ", req.method);
  }
  next();
}

router.use("/:id", categoryMiddleware);
router.get("/", getAllCategories);
router.post("/", addNewCategory);
router.get("/:id", retrieveParticularCategory);
router.delete("/", removeCategory);

// router
//   .route("/")
//   .get(async (req, res) => {
//     try {
//       const category = await Category.find({});
//       res.json({ success: true, category });
//     } catch (error) {
//       console.log("error while fetching category data");
//       res.status(500).json({
//         success: false,
//         errMsg: "error while fetching category data",
//         err: error.message,
//       });
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       const category = req.body;
//       let newCategory = new Category(category);
//       newCategory = await newCategory.save();
//       res.json({ success: true, newCategory });
//     } catch (error) {
//       console.log("error while inserting category data");
//       res.status(500).json({
//         success: false,
//         errMsg: "error while inserting category data",
//         err: error.message,
//       });
//     }
//   });

// router.param("categoryId", async (req, res, next, categoryId) => {
//   try {
//     const category = await Category.findOne({ _id: categoryId });
//     if (!category) {
//       res
//         .status(400)
//         .json({ success: false, message: "Unable to fetch category" });
//     }
//     req.category = category;
//     next();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unaable to fetch category",
//       errMsg: error.message,
//     });
//   }
// });

// router
//   .route("/:categoryId")
//   .get((req, res) => {
//     try {
//       let { category } = req;
//       res.json({ success: true, category });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Unable to find catgeory",
//         errMsg: error.message,
//       });
//     }
//   })
//   .post(async (req, res) => {
//     let { category } = req;
//     const updatedCategory = req.body;
//     try {
//       category = extend(category, updatedCategory);
//       category = await category.save();
//       res.json({ success: true, category });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Unable to update category",
//         errMsg: error.message,
//       });
//     }
//   });

module.exports = router;
