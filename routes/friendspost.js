const express = require('express')
const friendspost = require('../controllers/friendspost')

const router = express.Router()
router.get('/:id',friendspost.getAllFriendsPost)

module.exports = router