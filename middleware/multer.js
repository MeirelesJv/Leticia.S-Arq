const multer = require('multer')
const path = require('path')


// const fileFilter = (req, file, cb) => {
//     if(file.fieldname === 'filesReference'){
//         if (file.mimetype.startsWith("image")) {
//             cb(null, true);
//         } else {
//             cb("Please upload only images.", false);
//         }
//     }
//     cb(null, true);
// };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(file.fieldname === 'filesReference'){
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        }else{
            callback(null, true)
        }
    }
})

module.exports = upload;