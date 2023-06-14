const asyncHandler = require('../middleware/async')
const User = require("../models/User")

exports.searchAllUser = asyncHandler(async(req,res,next)=>{
	const{name} = req.query
	const result = await User.find({name:{$regex:name,$options:"i"}})
	if(!result){
		res.status(404).json({success:false, error:"An error occured while searching"})
	}
	res.status(200).json({success:true,data:result})
})