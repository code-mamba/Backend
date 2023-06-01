const express = require('express')
const router = express.Router()
const request = require('../controllers/request')

router.post('/',request.addRequest)
router.get('/:id',request.getUserRequests)
router.post('/:userId',request.confirmRequest)
router.delete('/:userId/:myId',request.ignoreRequest)
router.delete('/unfriend/:myId/:userId',request.unFriend)
module.exports = router