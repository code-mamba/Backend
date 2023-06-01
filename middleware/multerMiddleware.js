const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'public/')
	},
	filename:function(req,file,cb){
		const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1e9);
		const fileExtension = path.extname(file.originalname);
		cb(null,uniqueSuffix+fileExtension)
	}
})
const upload = multer({storage:storage,limits:{files:5}})
module.exports = upload