const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const morgan = require('morgan')
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser")
const cors = require('cors')


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



app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  // close server and exit
  server.close(() => process.exit(1));
});
