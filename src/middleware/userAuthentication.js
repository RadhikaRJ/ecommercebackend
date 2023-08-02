const { User } = require("../models/user.model");

const jwt = require("jsonwebtoken");
const env = require("dotenv").config({ path: "./.env" });

const userAuthentication = async (req, res, next) => {
  const token = req.header("authenticationToken");
  console.log("token: ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not found. Authorization failed." });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    console.log(" req.user: ", req.user);
    const id = req.user;
    console.log("id: ", id);
    const userVerification = await User.findOne({ _id: id });
    console.log("userVerification: ", userVerification);
    console.log("userVerification.status: ", userVerification.status);
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
