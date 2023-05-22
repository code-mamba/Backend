const express = require('express')
const {register,login, googleLogin, getMe, forgotPassword, resetPassword, setResetPassword} = require('../controllers/auth')
const{protect} = require('../middleware/auth')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/google',googleLogin)
router.get('/me',protect,getMe)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',resetPassword)
router.post('/reset-password/:id/:token',setResetPassword)
module.exports = router