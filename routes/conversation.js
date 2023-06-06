const express = require('express')
const router = express.Router()
const conversation = require('../controllers/conversation')

// new conversation
router.post("/",conversation.newConversation)
router.get("/:userId",conversation.getConversation)
module.exports = router;