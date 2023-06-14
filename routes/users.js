const express = require('express')
const router = express.Router()
const users = require("../controllers/users")
const upload = require("../middleware/multerMiddleware")
router.post('/:myId',upload.fields([{name:"profilePic",maxCount:1},{name:"coverImg",maxCount:1}]),users.profileUpdate)
module.exports=router