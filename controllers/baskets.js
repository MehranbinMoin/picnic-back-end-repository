const express = require('express')
const verifyToken = require('../middleware/verify-token')
const Basket = require('../models/basket')
const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id
        const basket = await Basket.create(req.body)
        basket._doc.author = req.user
        res.status(201).json(basket)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.get('/', verifyToken, async (req, res) => {
    try {
        const baskets = await Basket.find({})
            .populate('author')
            .sort({ createdAt: 'desc' })
        res.status(200).json(baskets)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.get('/:basketId', verifyToken, async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.basketId).populate([
            'author',
            'comments.author'
        ])
        res.status(200).json(basket)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.put('/:basketId', verifyToken, async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.basketId)
        if (!basket.author.equals(req.user._id)) {
            return res.status(403).json({ err: 'You are not the creator of this basket!' })
        }
        const updatedBasket = await Basket.findByIdAndUpdate(req.params.basketId, req.body, { new: true })
        updatedBasket._doc.author = req.user
        res.status(200).json(updatedBasket)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.delete('/:basketId', verifyToken, async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.basketId)
        if (!basket.author.equals(req.user._id)) {
            return res.status(403).json({ err: 'You are not the creator of this basket!' })
        }
        const deletedBasket = await Basket.findByIdAndDelete(req.params.basketId)
        res.status(200).json(deletedBasket)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.post('/:basketId/comments', verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id
        const basket = await Basket.findById(req.params.basketId)
        basket.comments.push(req.body)
        await basket.save()
        const newComment = basket.comments[basket.comments.length - 1]
        newComment._doc.author = req.user
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.put('/:basketId/comments/:commentId', verifyToken, async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.basketId)
        const comment = basket.comments.id(req.params.commentId)
        if (comment.author.toString() !== req.user._id) {
            return res.status(403).json({ message: 'You do not have permission to edit this comment!' })
        }
        comment.text = req.body.text
        await basket.save()
        res.status(200).json({ message: 'Comment updated successfully!' })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.delete('/:basketId/comments/:commentId', verifyToken, async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.basketId)
        const comment = basket.comments.id(req.params.commentId)
        if (comment.author.toString() !== req.user._id) {
            return res.status(403).json({ message: 'You do not have permission to delete this comment!' })
        }
        basket.comments.remove({ _id: req.params.commentId})
        await basket.save()
        res.status(200).json({ message: 'Comment deleted successfully!' })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

module.exports = router