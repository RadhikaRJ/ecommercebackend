const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user.controller");

const { userAuthentication } = require("../middleware/userAuthentication");

const { userRegistration, userLogin, getUserDetailsByUserID } = controllers;

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/", userAuthentication, getUserDetailsByUserID);

module.exports = router;
