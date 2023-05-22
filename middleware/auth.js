const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

exports.protect = asyncHandler(async(req,res,next)=>{
	let token
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		token = req.headers.authorization.split(' ')[1]
	}
	else if(req.cookies.token){
		token = req.cookies.token
	}
	if(!token){
		return next(new ErrorResponse("Not authorize to access this route",401))
	}
	try {
		const decoded = jwt.verify(token,process.env.JWT_SECRET)
		const userId = decoded.userId
		console.log("Decoded userId",userId)
		const user = await User.findById(userId)
		console.log("User:", user);
		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		  }
		req.userId = userId
		req.user=user
		next()
		
	} catch (error) {
		return next(new ErrorResponse("Not authorize to access this route",401))
	}
})