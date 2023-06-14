const asyncHandler = require('../middleware/async')
const Post = require("../models/Post")

exports.likePost = asyncHandler(async(req,res,next)=>{
	const userId = req.params.id
	console.log(userId);
	const {postId} = req.body
	console.log(postId)
	const liked = await Post.findByIdAndUpdate({_id: new ObjectId(postId)},{$push:{likedby:new ObjectId(userId)}})
	if(liked){
		return res.status(200).json({success:true,liked})
	}
	res.status(400).json({success:false,error:"something went wrong"})
})