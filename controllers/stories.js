const asyncHandler = require('../middleware/async')
const Story = require("../models/Stories")


// create new story
//  Post/api/v1/stories
exports.createStory = asyncHandler(async(req,res,next)=>{
	const {caption, senderId} = req.body;
	const {filename} = req.file

	const existingStory = await Story.findOne({senderId})

	if(existingStory){
		existingStory.story.push({story:filename,caption:caption})
		await existingStory.save()
		res.status(201).json({success:true, data: existingStory})
	}
	else{
		const story = await Story.create({
			senderId: senderId,
			
			story: [{story:filename,caption:caption}]
		})
		if(story){
			res.status(201).json({success:true,data:story})
		}
		else{
			res.status(400).json({success:false})
		}
	}
	
})
// Get all Stories
exports.getAllStories = asyncHandler(async(req,res,next)=>{
	console.log("stories")
	const userStories = await Story.aggregate([
		{
			$lookup:{
				from:"users",
				localField:"senderId",
				foreignField:"_id",
				as:"user_status"
			}
		}
	]).sort({date:-1})
	
	if(userStories){
		res.status(200).json({success:true, userStories})
	}
	else{
		res.status(200).json({success:true, messsage:"no story available"})
	}
})
// Get single user's story

exports.getSingleUserStory = asyncHandler(async(req,res,next)=>{
	const {userId} = req.params
	const currentStory = await Story.find({senderId:userId}).sort({"story.date":-1})
	if(currentStory){
		res.status(200).json({success:true, data: currentStory})
	}
	else{
		res.status(400).json({success:false, message: "something went wrong"})
	}
})