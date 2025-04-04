const express = require('express')
const router = express.Router()

router.get('/sign-token', (req, res) => {
    const user = {
        _id: 42,
        username: 'Mehran',
        password: '1234'
    }
    res.json({ message: 'You are authorized!' })
})

module.exports = router