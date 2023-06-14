const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'public/')
	},
	filename:function(req,file,cb){
		const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1e9);
		const fileExtension = path.extname(file.originalname);
		const fileType = file.mimetype.split('/')[0]
		const newFileName = uniqueSuffix +'.'+fileType+fileExtension
		cb(null,newFileName)
	}
})
const upload = multer({storage:storage,
	limits:{files:5},
	fileFilter:function(req,file,cb){
	const alloweFileTypes=['image/jpeg','image/png','video/mp4','vide/quicktime'];
	if(alloweFileTypes.includes(file.mimetype)){
		cb(null,true)
	}
	else{
		cb(new Error('Invalid file type'));
	}
}})
module.exports = upload