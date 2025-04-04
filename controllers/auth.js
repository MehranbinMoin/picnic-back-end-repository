const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/sign-up', (req, res) => {
    res.json({ message: 'Sign up complete!' })
})

module.exports = router