const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})