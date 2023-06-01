const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/multerMiddleware')

router.get('/',posts.getAllUsersPosts)
router.get('/:id',posts.getSingleUserPosts)
router.post('/',upload.single('file'),posts.createPost)
router.put('/:id',protect,posts.updatePost)
router.delete('/:id',posts.deletePost)
module.exports = router