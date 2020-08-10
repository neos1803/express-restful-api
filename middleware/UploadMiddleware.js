const multer = require('multer');
const path = require("path");

//multer.diskStorage() creates a storage space for storing files. 
const storage = multer.diskStorage({
    destination:function(req, file,cb){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
            cb(null, './public/images');
        } else {
            cb({message: 'this file is neither a video or image file'}, false)
        }
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage:storage });
module.exports = upload;