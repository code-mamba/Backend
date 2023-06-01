const express = require('express')
const router = express.Router()
const savedPost = require('../controllers/savedPost')

router.get('/:id',savedPost.getAllSavedPosts)
router.post('/:id',savedPost.savePost)
router.post('/',savedPost.removeSavedPost)

module.exports = router