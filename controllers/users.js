const asyncHandler = require('../middleware/async')
const User = require('../models/User')

exports.profileUpdate = asyncHandler(async(req,res,next)=>{
	const { name, bio, city, country, relationship,dob} = req.body
	const{myId} = req.params
	let profilePic = req.files['profilePic']?req.files['profilePic'][0].filename:null
	let coverImg = req.files['coverImg']?req.files['coverImg'][0].filename:null

	console.log(myId)
	try{
		let updatedUser = await User.findOneAndUpdate({_id:myId},{
			$set:{
				name:name||undefined,
				bio:bio||undefined,
				city:city||undefined,
				country:country||undefined,
				relationship:relationship||undefined,
				profilepic:profilePic||undefined,
				coverImage:coverImg||undefined,
				dob:new Date(dob)
			},
		},{new:true})
		if(!updatedUser){
			return res.status(404).json({error:'User not found'})
		}
		return res.status(200).json({message:'User data updated successfully'})

	}
	catch(error){
		return res.status(500).json({error:'Internal server error'})
	}
	
})
exports.isBirthdayToday = asyncHandler(async(req,res,next)=>{
	const {userId} = req.params
	// const userFound = await User.find({
	// 	$expr: {
	// 	  $and: [
	// 		{ $eq: [{ $dayOfMonth: '$dob' }, { $dayOfMonth: new Date() }] },
	// 		{ $eq: [{ $month: '$dob' }, { $month: new Date() }] },
	// 	  ],
	// 	},
	//   });
	//   console.log("userFound",userFound)
	  const myFriend = await User.findById(userId,{friends:1})
	  const myFriendIds = myFriend.friends.map((friendId)=>friendId.toString())
	  const myfriendData = await User.find({
		_id:{$in:myFriendIds},
		$expr:{
			$and:[
				{$eq:[{$dayOfMonth:"$dob"},{$dayOfMonth: new Date()}]},
				{$eq:[{$month:"$dob"},{$month:new Date()}]}
			]
		}
	  },{
		_id:1,name:1,email:1,dob:1
	  })
	  res.status(200).json({succes:true,data:myfriendData})
})
