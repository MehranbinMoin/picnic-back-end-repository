const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

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
    },
    comments: [commentSchema]
}, { timestamps: true })

const Basket = mongoose.model('Basket', basketSchema)

module.exports = Basket