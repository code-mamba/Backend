const express = require('express')
const router = express.Router()
const LikedPost = require('../controllers/likes')


router.post('/:id',LikedPost.likePost)


module.exports = router