const asyncHandler = require('../middleware/async')
const Post = require("../models/Post")
const{ObjectId} = require('mongodb')

exports.getAllSavedPosts = asyncHandler(async(req,res,next)=>{
	const userId = req.params.id
	const data = await Post.find({savedby: new ObjectId(userId)})
	if(data){
		return res.status(200).json({success:true,message:"all saved post",data})
	}
	res.status(400).json({success:false,message: 'something went wrong'})
	
})
exports.savePost = asyncHandler(async(req,res,next)=>{
	const userId = req.params.id
	console.log(userId);
	const {postId} = req.body
	console.log(postId)
	const saved = await Post.findByIdAndUpdate({_id: new ObjectId(postId)},{$push:{savedby:new ObjectId(userId)}})
	if(saved){
		return res.status(200).json({success:true,saved})
	}
	res.status(400).json({success:false,error:"something went wrong"})
})
exports.removeSavedPost = asyncHandler(async(req,res,next)=>{
	console.log("wloo")
	const {userId, postId} = req.body
	console.log(userId)
	console.log(postId)
	
	const unsaved = await Post.updateOne({_id: new ObjectId(postId)},{$pull:{savedby:new ObjectId(userId)}})
	if(unsaved){
		return res.status(200).json({success:true,unsaved})
	}
	res.status(400).json({success:false,error:"something went wrong"})
})