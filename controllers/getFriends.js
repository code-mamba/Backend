const asyncHandler = require("../middleware/async");
const User = require('../models/User')

exports.getFriends = asyncHandler(async(req,res,next)=>{
	const{id} = req.params
	console.log(id)
	const FriendsId = await User.findById(id,{friends:1})
	console.log(FriendsId.friends)
	const friendsIds = FriendsId.friends
	const FriendsData = await User.find({_id:{$in:friendsIds}})
	if(!FriendsData){
		return res.status(400).json({success:true,data:FriendsData})
	}
	res.status(200).json({success:true,data:FriendsData})
})

// This controller is used to check whether the some user is Current user's friend or not
exports.checkFriendshipStatus = asyncHandler(async(req,res,next)=>{
	console.log(req.params)
	const{id,userId} = req.params
	
	const data = await User.findOne({_id:id,friends:{$in:[userId]}})
	if(!data){
		return res.status(400).json({success:false})
	}
	res.status(200).json({success:true})
})