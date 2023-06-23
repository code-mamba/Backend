const express = require('express')
const {register,login, googleLogin, getMe, forgotPassword, resetPassword, setResetPassword, logout} = require('../controllers/auth')
const upload = require('../middleware/multerMiddleware')


const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/me/:id',getMe)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',resetPassword)
router.post('/reset-password/:id/:token',setResetPassword)
router.get('/logout',logout)


module.exports = router