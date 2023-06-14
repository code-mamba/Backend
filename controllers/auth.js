const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
// @desc    Register user
// @route  POST/api/v1/auth/register
// @access public
exports.register = asyncHandler(async (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;
  const user = await User.create({
    name: userName,
    email: userEmail,
    password: userPassword,
  });
  //   create token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
// @desc    Login user
// @route  POST/api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  // Validate email and password
  if (!userEmail || !userPassword) {
    return next(new ErrorResponse("please provide email and password", 400));
  }
  // check
  const user = await User.findOne({ email: userEmail }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }
  // check if password matches
  const isMatch = await user.matchPassword(userPassword);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  console.log(email)
  try {
    const oldUser = await User.findOne({ email });
    console.log(oldUser)
    if (!oldUser) {
      return res.json({ message: "User Not Exist" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    console.log("secret",secret)
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/api/v1/auth/reset-password/${oldUser.id}/${token}`;
    var transporter = nodemailer.createTransport({
      service:"hotmail",
      auth: {
        user: "dhanush.baskaran@aspiresys.com",
        pass: "Simtangaran@123",
      },
    });

    var mailOptions = {
      from: "dhanush.baskaran@aspiresys.com",
      to: email,
      subject: "Password reset:",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(link);
  } catch (error) {
    console.log(error);
  }
});
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  console.log("inside get request");
  console.log(id, token);
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ message: "user not exist" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const email = verify.email;

    const redirectUrl = `http://localhost:3000/resetPassword?email=${encodeURIComponent(
      email
    )}&id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  } catch (error) {
    res.send("Not verified");
  }
});
exports.setResetPassword = asyncHandler(async (req, res, next) => {
  console.log("inside post request");

  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ message: "user not exist" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      { $set: { password: encryptedPassword } }
    );
    res.json({ status: "password updated" });
  } catch (error) {
    res.json({ status: "Something went wrong" });
  }
});
exports.getMe = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id)
  if(!isValidObjectId){
    return res.status(400).json({error:'Invalid user Id'})
  }
  const user = await User.findById(id)
  if(!user){
    return res.status(404).json({error:'User Not found'})
  }
  res.status(200).json({data:user})
});

// Get token from model and send cookie to response

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  console.log(token)

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
// @desc Log user out / clear cookie
// @route GET/api/v1/auth/logout
exports.logout = asyncHandler(async(req,res,next)=>{
  res.cookie('token','none',{
    expires: new Date(Date.now()+10*1000),
    httpOnly: true
  })
  res.status(200).json({
    success:true,
    data:{}
  })
})
