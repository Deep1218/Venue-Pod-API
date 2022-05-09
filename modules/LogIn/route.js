const express = require("express");
const { count } = require("../../model/users");

// total user function
const User = require("../../model/users");
User.countDocuments({}, function(error, count) {
    console.log(count);
});

const auth = require("./middleware");
const router = new express.Router();

// GET '/'
router.get("/", async(req, res) => {
    const user = await User.find({});

    console.log(count);
    res.send(user);
});

// POST '/register'
router.post("/register", async(req, res) => {
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
router.post("/login", async(req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

//Log out
router.post("/logout", auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send("logout");
    } catch (e) {
        res.status(500).send();
    }
});

// logout all
router.post("/logoutAll", auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// PATCH '/me'
router.patch("/me", auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "mobileNumber", "password"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// delete
router.delete("/remove", auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;