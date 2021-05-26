const express = require("express");

const { User } = require("../models/user.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = await User.find({});
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: "Could not fetch user data",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const user = req.body;
      let newUser = new User(user);
      newUser = await newUser.save();
      res.json({ success: true, newUser });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: "Could not insert user data",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
