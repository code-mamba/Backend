const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
// Get all Posts
// Get/api/v1/posts

exports.getAllUsersPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({date:-1});

  res.status(200).json({ success: true, count: posts.length, data: posts });

});
// Get single user Posts

exports.getSingleUserPosts = asyncHandler(async (req, res, next) => {
  console.log(req.params.id)
  const post = await Post.find({userId: req.params.id});
  
  if (!post) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({success:true,data:post, count:post.length})
});
//  create new posts
//  POST /api/v1/posts

exports.createPost = asyncHandler(async (req, res, next) => {
  const{caption,userName,userId} =req.body;
  const{filename} = req.file
  const post = await Post.create({
    userName:userName,
    userId:userId,
    caption:caption,
    photo: filename
  });
  if(post){
    res.status(201).json({ success: true, data: post });
  }
  else{
    res.status(400).json({ success: false });
  }
  
});
//  update posts
//  PUT/api/v1/posts/:id

exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: post });

  next(error);
});
//  delete posts
//  Delete/api/v1/posts/:id

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: {} });

});
