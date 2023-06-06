const asyncHandler = require('../middleware/async')
const Post = require("../models/Post")
const User = require("../models/User")

exports.getAllFriendsPost = asyncHandler(async(req,res,next)=>{
	console.log(req.params)
	const{id} = req.params
	const friendsId = await User.findById(id,{friends:1})
	
	console.log("Hellow ",friendsId)
	const friendsPost = await Post.find({userId:{$in:friendsId.friends}})
	if(!friendsPost){
		return res.status(400).json({success:false,message:'something went wrong'})
	}
	res.status(200).json({success:true,data:friendsPost})
	console.log(friendsPost)
})