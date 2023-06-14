const express = require('express')
const comments = require('../controllers/comments')

const router = express.Router()
router.post('/',comments.newComment)
router.get('/:postId',comments.getAllComments)

module.exports = router