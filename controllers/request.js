const asyncHandler = require("../middleware/async");
const User = require('../models/User')
const{ObjectId} = require('mongodb')

exports.addRequest = asyncHandler(async(req,res,next)=>{
	const{userId,myId} = req.body
	console.log(userId, myId)
	const request = await User.findByIdAndUpdate({_id: new ObjectId(userId)},{$push:{pendingrequest :new ObjectId(myId)}})
	 if(!request){
		return res.status(400).json({ success: false });
	 }
	 res.status(200).json({success:true, data: request})
	 console.log(request)
})
exports.getUserRequests = asyncHandler(async(req,res,next)=>{
	const{id} = req.params
	const myId = id
	const request = await User.findOne({_id: new ObjectId(myId)})
	const pendingRequest = request.pendingrequest 
	const data = await User.find({_id:{$in:pendingRequest}})
	console.log(data)
	if(!request){
		return res.status(400).json({success:false})
	}
	res.status(200).json({success:true,data})

})
exports.confirmRequest = asyncHandler(async(req,res,next)=>{
	const{userId}= req.params
	const{myId} = req.body
	console.log(userId)
	console.log("myId",req.body)
	const confirm = await User.findByIdAndUpdate({_id:myId},{$push:{friends:userId}})
	if(!confirm){
		return res.status(400).json({success:false, message:'cannot find Id'})
	}
	const deleteFromPending = await User.findByIdAndUpdate({_id:myId},{$pull:{pendingrequest:userId}})
	res.status(200).json({success:true, data:deleteFromPending})
})
exports.ignoreRequest = asyncHandler(async(req,res,next)=>{
	console.log(req.params)
	const{userId,myId} = req.params
	const ignore = await User.findByIdAndUpdate({_id:myId},{$pull:{pendingrequest:userId}})
	if(!ignore){
		return res.status(400).json({success:false,message:"something went wrong"})
	}
	res.status(200).json({success:true, ignore})
})

exports.unFriend = asyncHandler(async(req,res,next)=>{
	console.log("hello")
	const{myId, userId} = req.params

	console.log('Dhanush',myId)
	console.log("tkr", userId)
	const unFriend = await User.findByIdAndUpdate({_id:userId},{$pull:{friends:myId}})
	if(!unFriend){
		return res.status(400).json({success:false, message:"something went wrong"})
	}
	res.status(200).json({success:true, data:unFriend})
	console.log(unFriend)
})