const asyncHandler = require('../middleware/async')
const Post = require("../models/Post")
const{ObjectId} = require('mongodb')

/*This method is find the saved post of current user that current user id is stored in savedby field in post collection */
exports.getAllSavedPosts = asyncHandler(async(req,res,next)=>{
	const userId = req.params.id
	const data = await Post.find({savedby: new ObjectId(userId)})
	if(data){
		return res.status(200).json({success:true,message:"all saved post",data})
	}
	res.status(400).json({success:false,message: 'something went wrong'})
	
})

/*this method is to store the current user id to post's savedBy field  in a particular post*/
exports.savePost = asyncHandler(async(req,res,next)=>{
	const userId = req.params.id
	
	const {postId} = req.body
	
	const saved = await Post.findByIdAndUpdate({_id: new ObjectId(postId)},{$push:{savedby:new ObjectId(userId)}})
	if(saved){
		return res.status(200).json({success:true,saved})
	}
	res.status(400).json({success:false,error:"something went wrong"})
})

/*this method is to remove the current user id from the savedBy array in a particular post */
exports.removeSavedPost = asyncHandler(async(req,res,next)=>{
	const {userId, postId} = req.body
	
	
	const unsaved = await Post.updateOne({_id: new ObjectId(postId)},{$pull:{savedby:new ObjectId(userId)}})
	if(unsaved){
		return res.status(200).json({success:true,unsaved})
	}
	res.status(400).json({success:false,error:"something went wrong"})
})