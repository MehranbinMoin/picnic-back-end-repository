const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })

        if (userInDatabase) {
            return res.status(409).json({ err: 'Username is already taken.'})
        }
    } catch (err) {

    }
})

module.exports = router