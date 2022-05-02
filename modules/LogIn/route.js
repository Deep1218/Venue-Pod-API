const express = require('express')
const User = require('../../model/users')
    // const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/signup', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
            // const token = await user.generateAuthToken()
        res.send(user)

    } catch (e) {
        res.send(e)
    }


})
router.get('/users', async(req, res) => {
    const user = await User.find({})
    res.send(user)
})




module.exports = router