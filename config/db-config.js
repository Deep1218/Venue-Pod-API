const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE;

mongoose
  .connect(url)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => {
    console.log("connectoion failed", error);
  });

console.log(process.env.PORT);
