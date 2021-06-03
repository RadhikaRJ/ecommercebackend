const { Offer } = require("../models/offer.model");

const retrieveAllOffers = async (req, res) => {
  try {
    const allOffers = await Offer.find({});
    if (!allOffers) {
      res
        .status(400)
        .json({ success: false, message: "Offers detail not found!" });
    }

    res.status(200).json({ success: true, allOffers });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const addNewOffer = async (req, res) => {
  try {
    const { offer_name } = req.body;
    let newOffer = new Offer({ offer_name });
    newOffer = await newOffer.save();

    if (!newOffer) {
      res
        .status(400)
        .json({ success: false, message: "Unable to add new offer" });
    }

    res.status(200).json({ success: true, newOffer });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const getParticularOfferDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findById({ _id: id });
    if (!offer) {
      res
        .status(400)
        .json({ success: false, message: "Offer details not found" });
    }

    res.status(200).json({ success: true, offer });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

const removeOffer = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Offer.findByIdAndRemove({ _id: id });
    if (!result) {
      res
        .status(400)
        .json({ success: false, message: "could not remove the Offer" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errMsg: error.message,
    });
  }
};

module.exports = {
  retrieveAllOffers,
  addNewOffer,
  getParticularOfferDetails,
  removeOffer,
};
