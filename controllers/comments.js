const asyncHandler = require('../middleware/async')

const Comments = require('../models/Comments')
const {ObjectId} = require('mongodb')

exports.newComment = asyncHandler(async(req,res,next)=>{
	const{senderId, comment, postId, postuserId} = req.body
	const newComment = await Comments.create(
		{
			postId:postId,
			postUserId:postuserId,
			senderId:senderId,
			comment:comment
		}
	)
	res.status(200).json({success:true, newComment})

})
exports.getAllComments = asyncHandler(async(req, res, next) => {
	const { postId } = req.params;
	console.log(postId);
	const getComments = await Comments.aggregate([
	  {
		$match: { postId: new ObjectId(postId) }
	  },
	  {
		$lookup: {
		  from: "users",
		  localField: "senderId",
		  foreignField: "_id",
		  as: "commentedUserData"
		}
	  },{
		$project:{
			"commentedUserData.name":1,
			"commentedUserData.profilepic":1,
			"comment":1
		}
	  }
	]);
	console.log(getComments);
	if (!getComments) {
	  return res.status(404).json({ success: false, error: "No comments" });
	}
	res.status(200).json({
	success:true,getComments
	});
  });
  

