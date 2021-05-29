const express = require("express");

const { Offer } = require("../models/offer.model");
const { extend } = require("lodash");
const router = express.Router();

function offerMiddleware(req, res, next) {
  if (req.params) {
    console.log("Req params", req.params);
    console.log("Req type: ", req.method);
  }
  next();
}

router.use("/:id", offerMiddleware);
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

router.param("offerId", async (req, res, next, offerId) => {
  try {
    const offer = await Offer.findById(offerId);
    if (!offer) {
      res
        .status(400)
        .json({ success: false, errMessage: "Unable to find Offer" });
    }
    req.offer = offer;
    next();
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Unable to find offer",
      errMsg: error.message,
    });
  }
});

router
  .route("/:offerId")
  .get((req, res) => {
    try {
      let { offer } = req;
      res.json({ success: true, offer });
    } catch (error) {
      res.status(500).json({
        success: false,
        errMsg: error.message,
        message: "Unable to find offer",
      });
    }
  })
  .post(async (req, res) => {
    let { offer } = req;
    const updatedOffer = req.body;
    try {
      offer = extend(offer, updatedOffer);
      offer = await offer.save();
      res.json({ success: true, offer });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "unable to update the offer",
        errMsg: error.message,
      });
    }
  });

module.exports = router;
