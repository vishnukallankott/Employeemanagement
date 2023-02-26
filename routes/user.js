
const fs=require('fs');
const { request } = require('http');
const path=require('path')
const multer=require('multer')
const {adduser,addUser1}=require('../controller/user')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(path.join(__dirname, "../uploads_temp"), { recursive: true })
      return cb(null, path.join(__dirname, "../uploads_temp"));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now()
        + path.extname(file.originalname))
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2000000
    }
  })
module.exports=function(router){

    router.post('/upload',upload.single('file'),addUser1)
    

    return router
}