const asyncHandler = require('../middleware/async')
const Conversation = require('../models/Conversation')


exports.newConversation = asyncHandler(async(req,res,next)=>{
	 console.log(req.body)
	 const members=[req.body.senderId,req.body.receiverId]
	 const savedConversation = await Conversation.create({members})
	 if(!savedConversation){
		return res.status(400).json({success: false,error: "something went wrong"})
	 }
	 res.status(200).json({success:true,savedConversation})
})
exports.getConversation = asyncHandler(async(req,res,next)=>{
	const conversation = await Conversation.find({
		members:{$in:[req.params.userId]}
	})
	if(!conversation){
		return res.status(400).json({success:false,error:"Something went wrong"})
	}
	res.status(200).json({
		success:true,conversation
	})
})