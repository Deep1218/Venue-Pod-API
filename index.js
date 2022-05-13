const express = require("express");
const morgan = require("morgan");
require("./config/db-config");
const { userRouter, venueRouter } = require("./route");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
