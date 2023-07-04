const express = require('express')
const upload = require('../middleware/multerMiddleware')
const router = express.Router()
const stories = require('../controllers/stories')

router.post('/',upload.single('file'),stories.createStory)
router.get('/',stories.getAllStories)
router.get('/:userId',stories.getSingleUserStory)

module.exports = router