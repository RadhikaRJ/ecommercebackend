const { User } = require("../models/user.model");

const jwt = require("jsonwebtoken");
const env = require("dotenv").config({ path: "./.env" });

const userAuthentication = async (req, res, next) => {
  const token = req.header("authentication-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not found. Authorization failed." });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded._id;
    const id = req.user;

    const userVerification = await User.findOne({ _id: id });

    if (userVerification && userVerification.status) {
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Token expired. Authorization failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, messaage: "User Authorization Failed" });
  }
};

module.exports = { userAuthentication };
