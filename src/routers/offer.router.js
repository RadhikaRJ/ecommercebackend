const express = require("express");

const { Offer } = require("../models/offer.model");

const router = express.Router();

function myLogger(req, res, next) {
  if (req.params) {
    console.log("Req params", req.params);
    console.log("Req type: ", req.method);
  }
  next();
}

router.use("/", myLogger);
router
  .route("/")
  .get(async (req, res) => {
    try {
      const offer = await Offer.find({});
      res.json({ success: true, offer });
    } catch (err) {
      console.log("error", err.message);
      res.status(500).json({
        success: false,
        errorMsg: "Something went wrong",
        errMsg: error.message,
      });
    }
  })
  .post(async (req, res) => {
    const offer = req.body;
    console.log("the offer data received is", { offer });
    let newOffer = new Offer(offer);
    try {
      newOffer = await newOffer.save();
      res.json({ success: true, newOffer });
    } catch (err) {
      console.log("error", err.message);
      res.json({
        success: false,
        errorMsg: "Something went wrong",
        errMsg: error.message,
      });
    }
  });

module.exports = router;
