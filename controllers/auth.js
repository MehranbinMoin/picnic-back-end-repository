const express = require('express')
const router = express.Router()

router.post('/sign-up', (req, res) => {
    res.json({ message: 'Sign up complete!' })
})

module.exports = router