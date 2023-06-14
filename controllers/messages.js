const asyncHandler = require('../middleware/async')
const Message = require('../models/Message')

exports.newMessage = asyncHandler(async(req,res,next)=>{
	console.log("hi")
	console.log(req.body)
	const savedMessage = await Message.create(req.body)
	if(!savedMessage){
		return res.status(400).json({success:false,err: "something went wrong"})
	}
	res.status(200).json({success:true,savedMessage})
})

exports.allMessages=asyncHandler(async(req,res,next)=>{
	const {conversationId} = req.params
	const messages = await Message.find({conversationId:conversationId})
	if(!messages){
		return(res.status(400).json({success:false,err:"something went wrong"}))
	}
	res.status(200).json({success:true,messages})
})