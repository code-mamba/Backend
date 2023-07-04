const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
	senderId:{
		type:mongoose.Schema.ObjectId,
		required:[true,'Please provide a senderId']
	},

	story:[{
		story:{
			type:String,
			required:true
		},
		caption:{
			type: String,
			required:[true, 'Please provide a caption'],
			trim:true,
			maxlength:[500,'caption cannot be more than 500 characters']
		},
		date:{
		type:Date,
		default: Date.now
	}
	}],
	date:{
		type: Date,
		default: Date.now()
	}
})
module.exports = mongoose.model('Story',StorySchema)