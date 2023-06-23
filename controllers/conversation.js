const asyncHandler = require('../middleware/async')
const Conversation = require('../models/Conversation')


exports.newConversation = asyncHandler(async(req,res,next)=>{
	const{senderId, receiverId} = req.body
	console.log(senderId,receiverId)

	const existingConversation = await Conversation.findOne({
		members:{
			$all:[senderId,receiverId]
		}
	})
	if(existingConversation){
		return res.status(200).json({success:true,message:"conversation already exist",data:existingConversation})
		
	}
	const members = [senderId,receiverId];
	const savedConversation=await Conversation.create({members})
	if(!savedConversation){
		return res.status(400).json({success:false, error:"something went wrong"})
	}
	res.status(200).json({success:true,data:savedConversation})
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
