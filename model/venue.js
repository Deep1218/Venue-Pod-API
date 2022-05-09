const mongoose = require("mongoose");
const validator = require("validator");

const venueSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  venueName: {
    type: String,
    required: true,
    trim: true,
  },
  buisnessEmail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  buisnessMobileNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  foodCategory: {
    type: String,
    required: true,
  },
  ratePerDay: {
    type: Number,
    required: true,
  },
  ratePerPlate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  aadharCard: {
    type: String,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
  },
  latestBill: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
