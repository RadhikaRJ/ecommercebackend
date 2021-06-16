const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user.controller");

const { userAuthentication } = require("../middleware/userAuthentication");

const { userRegistration, userLogin, getUserDetailsByUserID } = controllers;

// function userMiddleware(req, res, next) {
//   if (req.params) {
//     console.log("Req params: ", req.params);
//     console.log("Req type: ", req.method);
//   }
//   next();
// }

// router.use("/:id", userMiddleware);

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/", userAuthentication, getUserDetailsByUserID);
// router
//   .route("/")
//   .get(async (req, res) => {
//     try {
//       const user = await User.find({});
//       res.json({ success: true, user });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         errMsg: "Could not fetch user data",
//         errorMessage: error.message,
//       });
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       const user = req.body;
//       let newUser = new User(user);
//       newUser = await newUser.save();
//       res.json({ success: true, newUser });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         errMsg: "Could not insert user data",
//         errorMessage: error.message,
//       });
//     }
//   });

// router.param("userId", async (req, res, next, userId) => {
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       res.json({ success: false, messsage: "Unable to find user" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       errMsg: error.message,
//       message: "unable to find user",
//     });
//   }
// });

// router
//   .route("/:userId")
//   .get((req, res) => {
//     try {
//       let { user } = req;
//       res.json({ success: true, user });
//     } catch (error) {
//       res
//         .status(500)
//         .json({
//           success: false,
//           errMsg: error.message,
//           message: "unable to find user details",
//         });
//     }
//   })
//   .post(async (req, res) => {
//     let { user } = req;
//     const updatedUser = req.body;
//     try {
//       user = extend(user, updatedUser);
//       user = await user.save();
//       res.json({ success: true, user });
//     } catch (error) {
//       res
//         .status(500)
//         .json({
//           success: false,
//           errMsg: error.message,
//           message: "Unable to update user information",
//         });
//     }
//   });

module.exports = router;
