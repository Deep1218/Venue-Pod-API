const express = require("express");
const User = require("../../model/users");
const auth = require("./middleware");
const { setMail, transporter } = require("./uitils");
const crypto = require("crypto");

const router = new express.Router();

// GET '/'
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// POST '/register'
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// POST Logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send({ meesage: "logout" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// logout all
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ error });
  }
});

// PATCH '/me'
router.patch("/user", auth, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ["name", "email", "mobileNumber", "password"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(401).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send({ error });
  }
});

//DELETE
router.delete("/remove", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Deep Patel's work starts from here.

// Forgot password end point
router.post("/password-reset", auth, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.staus(400).send({ message: "Invalid User" });
    }

    // generating reset token
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.resetToken = token;
    await user.save();

    // setting mail format
    const mail = setMail(
      email, // TODO change this after testing
      "Reset Your Password",
      `${process.env.BASE_URL}/users/password-reset/${user._id}/${token}`
    );

    // sending mail
    transporter.sendMail(mail, (error, info) => {
      if (error) {
        res.status(401).send({ error });
      }
      res.status(200).send({ message: "Sent Successfully" });
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Reset password end point
router.post("/password-reset/:userId/:token", auth, async (req, res) => {
  try {
    const { userId, token } = req.params;

    const user = await User.findOne({
      _id: userId,
      resetToken: token,
    });

    if (!user) {
      res.staus(400).send({ message: "Invalid User or Token" });
    }

    // update user
    user.password = req.body.password;
    user.resetToken = "false";
    user.tokens = [];
    await user.save();

    res.status(200).send({ message: "Password has been changed" });
  } catch (error) {
    res.status(401).send({ error });
  }
});
module.exports = router;
