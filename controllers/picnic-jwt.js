const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/sign-token', (req, res) => {
    const user = {
        _id: 25,
        username: 'Mehran',
        password: '1234'
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET)

    res.json({ token })
})

router.post('/verify-token', (req, res) => {
    const token = req.headers.authorization

    res.json({ token })
})

module.exports = router