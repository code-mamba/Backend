const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  profilepic:{
    type:String,
    default: 'no-photo.jpg',
  },
  coverImage:{
    type: String,
    default:'no-photo.jpg'
  },

  bio:{
    type:String,
  },
  city:{
    type:String,
  },
  country:{
    type: String,
  },
  relationship:{
    type:String
  },
  dob:{
    type:Date
  },
	pendingrequest:[{
		type:mongoose.Schema.ObjectId
	}],
  friends:[{
    type: mongoose.Schema.ObjectId
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Sign jwt and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Match user enter password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
	 return await bcrypt.compare(enteredPassword,this.password)
}
module.exports = mongoose.model("User", UserSchema);
