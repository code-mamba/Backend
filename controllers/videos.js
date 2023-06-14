const asyncHandler = require('../middleware/async')
const Post = require("../models/Post")

exports.getVideos = asyncHandler(async (req, res, next) => {
	console.log("videos");
	const videos = await Post.find({ photo: { $regex: /\.mp4$/i } });
	console.log(videos);
  
	res.status(200).json({ success: true, count: videos.length, data: videos });
  });