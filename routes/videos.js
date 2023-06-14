const express = require('express')
const videos = require('../controllers/videos')
const router = express.Router()

router.get('/',videos.getVideos)

module.exports = router