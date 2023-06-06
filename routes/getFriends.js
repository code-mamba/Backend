const Express = require('express')
const router = Express.Router()
const friends = require('../controllers/getFriends')


router.get('/:id',friends.getFriends)
router.get('/:id/:userId',friends.checkFriendshipStatus)
module.exports = router