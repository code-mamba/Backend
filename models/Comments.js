const mongoose = require("mongoose")
const CommentSchema = new mongoose.Schema({
	postId:{
		type: mongoose.Schema.ObjectId
	},
	postUserId:{
		type: mongoose.Schema.ObjectId
	},
	senderId:{
		type:mongoose.Schema.ObjectId
	},
	comment:{
		type: String
	}
})
module.exports = mongoose.model("Comments", CommentSchema);