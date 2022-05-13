const express = require('express');
const morgan = require("morgan");
require('./config/db-config')
const { userRouter, venueRouter } = require('./route')

const { userRouter } = require("./route");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

<<<<<<< HEAD
app.use(express.json())
app.use("/users", userRouter)
app.use("/", venueRouter)


const User = require('./model/users')
const Venue = require('./model/venue')
=======
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
>>>>>>> passwordApi
