const express = require("express");
const Venue = require("../../model/venue");
const auth = require("../Helper/commonMiddleware");
const router = new express.Router();

// total venue function
Venue.countDocuments({}, function (error, count) {
  // console.log(count)
});

// get all
router.get("/", auth, async (req, res) => {
  const venue = await Venue.find({});
  res.status(200).send(venue);
});

// get all venues of logged in user (it will find by verifying token)
router.get("/user", auth, async (req, res) => {
  const venue = await Venue.find({ ownerId: req.user._id });
  res.status(200).send(venue);
});

// post venue by verifing token so that logged in user will post it
router.post("/", auth, async (req, res) => {
  try {
    const venue = new Venue(req.body);
    venue.ownerId = req.user._id;
    await venue.save();
    console.log(
      `https://maps.google.com/?q=${venue.coardinates.latitude},${venue.coardinates.longitude}`
    );
    res.status(200).send({ venue });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "category",
    "venueName",
    "buisnessEmail",
    "buisnessMobileNumber",
    "address",
    "pinCode",
    "city",
    "state",
    "country",
    "foodCategory",
    "ratePerDay",
    "ratePerPlate",
    "description",
    "aadharCard",
    "panCard",
    "latestBill",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const venue = await Venue.findOne({ _id: req.params.id });
    updates.forEach((update) => (venue[update] = req.body[update]));
    await venue.save();
    res.status(200).send(venue);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    await venue.remove();
    res.status(200).send("venue deleted");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
