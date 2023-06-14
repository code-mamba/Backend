const Express = require('express')
const router = Express.Router()
const messages = require("../controllers/messages")


router.post("/",messages.newMessage)
router.get("/:conversationId",messages.allMessages)

module.exports = router;