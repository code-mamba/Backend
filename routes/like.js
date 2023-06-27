const express = require('express')
const router = express.Router()
const Likes = require('../controllers/likes')


router.post('/:postId/:userId',Likes.likePost)
router.post('/',Likes.unlikePost)
router.get('/:postId/:userId',Likes.checkisLiked)
router.get('/:postId',Likes.peopleWhoLiked)


module.exports = router