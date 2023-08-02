const { User } = require("../models/user.model");
const { WishList } = require("../models/wishlist.model");
const { Cart } = require("../models/cart.model");
const { tokenGeneration } = require("../utility/tokenGeneration");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  try {
    let { username, password, email, status } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "username, email & password are mandatory user details",
      });
    }

    const verifyIfUserIsRegistered = User.findOne({ email });
    if (!verifyIfUserIsRegistered) {
      return res.status(400).json({
        success: false,
        message: "User associated with this email is already registered.",
      });
    }

    password = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password,
      status,
    });

    const registerUser = await newUser.save();

    const cart = new Cart({
      user: registerUser._id,
      cart_product_list: [],
    });

    await cart.save();

    const wishlist = new WishList({
      user: registerUser._id,
      wishlist_product_list: [],
    });

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "New User Registration is successfully completed.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Registration failed" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);
    const verifyIfUserIsRegistered = await User.findOne({ email });
    //console.log("verifyIfUserIsRegistered", verifyIfUserIsRegistered);

    if (!verifyIfUserIsRegistered) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials. User with this credentials is not registered.",
      });
    }
    console.log(
      "verifyIfUserIsRegistered.password : ",
      verifyIfUserIsRegistered.password
    );
    const verifyPassword = await bcrypt.compareSync(
      password,
      verifyIfUserIsRegistered.password
    );

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. Password does not match",
      });
    }

    const token = tokenGeneration(verifyIfUserIsRegistered._id);

    return res.status(200).json({ user: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Registration failed" });
  }
};

const getUserDetailsByUserID = async (req, res) => {
  try {
    const id = req.user;
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User associated with this id is not found.",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Registration failed" });
  }
};

module.exports = { userRegistration, userLogin, getUserDetailsByUserID };
