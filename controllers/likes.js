const asyncHandler = require('../middleware/async')
const Post = require("../models/Post")
const {ObjectId} = require('mongodb')

exports.likePost = asyncHandler(async (req, res, next) => {
	const { userId, postId } = req.params;
	console.log(userId);
	console.log(postId);
  
	const liked = await Post.findByIdAndUpdate(
	  postId,
	  { $addToSet: { likedby: userId } },
	  { new: true }
	);
  
	if (!liked) {
	  return res.status(404).json({ success: false, error: "Post not found" });
	}
  
	return res.status(200).json({ success: true, liked });
  });


exports.unlikePost = asyncHandler(async(req,res,next)=>{
	const {userId, postId} = req.body
	console.log(userId)
	console.log(postId)

	
	const unliked = await Post.updateOne({_id:postId},{$pull:{likedby:userId}})
	if(unliked){
		return res.status(200).json({success:true,unliked})
	}
	res.status(400).json({success:false,error:"something went wrong"})
})

exports.checkisLiked = asyncHandler(async(req,res,next)=>{
	const {userId,postId} = req.params
	console.log(userId)

	const isLiked = await Post.find({_id: new ObjectId(postId),likedby:{$in:[new ObjectId(userId)]}})
	if(!isLiked){
		return res.status(404).json({success:false,isLiked})
	}
	res.status(200).json({success:true,isLiked})
})
