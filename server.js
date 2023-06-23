const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const morgan = require('morgan')
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser")
const cors = require('cors')
const {Server} = require("socket.io")


//  Load env vars
dotenv.config({ path: "./config/config.env" });

// connect database
connectDB();

// initialize logger
const logger = morgan('dev')

// Route files
const posts = require("./routes/posts");
const auth = require("./routes/auth")
const saved = require("./routes/savedPost")
const request = require("./routes/request")
const getFriends = require("./routes/getFriends")
const friendspost = require("./routes/friendspost")
const conversation = require("./routes/conversation")
const messages = require('./routes/messages')
const users = require('./routes/users')
const videos = require('./routes/videos')
const search = require('./routes/search')
const comments = require('./routes/comments')
const likes = require('./routes/like')


const app = express();
// Body parser
app.use(express.json());
app.use(cookieParser())
app.use(cors())


// logger
app.use(logger)
app.use('/public',express.static('./public'))


// Mount routers
app.use("/api/v1/posts", posts);
app.use("/api/v1/auth",auth)
app.use("/api/v1/saved",saved)
app.use("/api/v1/request",request)
app.use("/api/v1/request/unfriend",request)
app.use("/api/v1/getfriends",getFriends)
app.use("/api/v1/friendspost",friendspost)
app.use("/api/v1/conversation",conversation)
app.use("/api/v1/messages",messages)
app.use("/api/v1/users",users)
app.use("/api/v1/videos",videos)
app.use("/api/v1/search",search)
app.use("/api/v1/comments",comments)
app.use("/api/v1/likes",likes)




app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
const io = new Server(server,{
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
})

io.on("connection",(socket)=>{
  console.log(`user connected ${socket.id}`)

  socket.on("disconnect",()=>{
    console.log("user disconnected", socket.id)
  })
})
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  // close server and exit
  server.close(() => process.exit(1));
});
