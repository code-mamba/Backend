const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts')

router.get('/',posts.getAllUsersPosts)
router.get('/:id',posts.getSingleUserPosts)
router.post('/',posts.createPost)
router.put('/:id',posts.updatePost)
router.delete('/:id',posts.deletePost)
module.exports = router