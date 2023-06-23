const asyncHandler = require("../middleware/async");
const User = require('../models/User')
const{ObjectId} = require('mongodb')


/*this method is to adding the current user's id to the another user's pending request */
exports.addRequest = asyncHandler(async(req,res,next)=>{
	const{userId,myId} = req.body
	const request = await User.findByIdAndUpdate({_id: new ObjectId(userId)},{$push:{pendingrequest :new ObjectId(myId)}})
	 if(!request){
		return res.status(400).json({ success: false });
	 }
	 res.status(200).json({success:true, data: request})
	
})

// getting the all requested user data 
exports.getUserRequests = asyncHandler(async(req,res,next)=>{
	const{id} = req.params
	const myId = id
	const request = await User.findOne({_id: new ObjectId(myId)})
	const pendingRequest = request.pendingrequest 
	const data = await User.find({_id:{$in:pendingRequest}})
	if(!request){
		return res.status(400).json({success:false})
	}
	res.status(200).json({success:true,data})

})
/* when a user confirms the friend request that particular requested id is stored in my friendslist,
  And my id is store in his friends field and delete the requested id from my pendingrequest*/

exports.confirmRequest = asyncHandler(async(req,res,next)=>{
	const{userId}= req.params
	const{myId} = req.body
	const confirm = await User.findByIdAndUpdate({_id:myId},{$push:{friends:userId}})
	if(!confirm){
		return res.status(400).json({success:false, message:'cannot find Id'})
	}
	const result = await User.findByIdAndUpdate({_id:userId},{$push:{friends:myId}})
	const deleteFromPending = await User.findByIdAndUpdate({_id:myId},{$pull:{pendingrequest:userId}})
	res.status(200).json({success:true, data:deleteFromPending})
})

exports.ignoreRequest = asyncHandler(async(req,res,next)=>{
	const{userId,myId} = req.params
	const ignore = await User.findByIdAndUpdate({_id:myId},{$pull:{pendingrequest:userId}})
	if(!ignore){
		return res.status(400).json({success:false,message:"something went wrong"})
	}
	res.status(200).json({success:true, ignore})
	
})
/* when a user unfriend the button my Id is remove from the other's friends array
   And their id is remove from my friend array */
   
exports.unFriend = asyncHandler(async(req,res,next)=>{
	const{myId, userId} = req.params
	const unFriend = await User.findByIdAndUpdate({_id:myId},{$pull:{friends:userId}})
	if(!unFriend){
		return res.status(400).json({success:false, message:"something went wrong"})
	}
	const result = await User.findByIdAndUpdate({_id:userId},{$pull:{friends:myId}})
	res.status(200).json({success:true, data:result})
})

/*This method is to check whether my id is another user's pending request */
exports.isMyIdInPendingRequest = asyncHandler(async(req,res,next)=>{
	const{myId,userId} = req.params
	const data = await User.find({ _id: userId, pendingrequest: { $in: [myId] } });
	if(data.length===0){
		res.status(200).json({success:true,message:"Not yet requested"})
	}
	res.status(200).json({success:true,data, message:"requested"})

	
})
/*This method is to cancel the request it will remove current user's id from the another user's pending request */
exports.cancelRequest = asyncHandler(async(req,res,next)=>{
	const{myId,userId} = req.params
	const cancelRequest = await User.findByIdAndUpdate({_id:userId},{$pull:{pendingRequest:myId}})
	if(!cancelRequest){
		return res.status(400).json({success:false,message:"user not exist"})
	}
	res.status(200).json({success:true,cancelRequest})
})