const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verify-token')
const User = require('../models/user')

router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find({}, "username")

        res.json(users)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.get('/:userId', verifyToken, async (req, res) => {
    try {
        if (req.user._id !== req.params.userId) {
            return res.status(403).json({ err: "Nice try, buddy!" })
        }
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({ err: 'User is not found.'})
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router