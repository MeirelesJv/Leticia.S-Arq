const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        const fileName = req.body.ad;
        // Adiciona uma extensão única para evitar conflitos
        cb(null, fileName + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage})

module.exports = upload;