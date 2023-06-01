const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
	userId:{
		type:mongoose.Schema.ObjectId,
		required:[true,'Please provide userId'],
	},
	userName:{
		type:String,
		required:[true,'Please provide user name']
	},
	caption:{
		type:String,
		required:[true,'Please add a message'],
		trim: true,
		required: [true,'Please add a caption'],
		maxlength:[150,'caption cannot be more than 150 characters']

	},
	savedby:[{
		type:mongoose.Schema.ObjectId
	}],
	tags:[{
		type:String,
	}],
	photo:{
		type:String,
		required: [true,'Please add a post'],
	},
	like:{
		type: Number,
		default:0
	},
	date:{
		type: Date,
		default: Date.now
	}
	
})
module.exports = mongoose.model('Post',PostSchema)