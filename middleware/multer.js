const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {  v4 : uuidv4  } = require("uuid");

function formatarHoraMinuto(timestamp) {
    
    return `${horas}:${minutos}`;
  }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if(file.fieldname != 'filesReference' && file.fieldname != 'files'){
            const projectRoute = req.body.projectRoute;
            console.log(projectRoute)
            const uploadPath = 'style/uploads/' + projectRoute;
            try {
                cb(null, uploadPath)
            } catch (error) {
                console.log(error)
            }
        }else{
            const dates = new Date(Date.now());
            const horas = dates.getHours().toString().padStart(2, '0');
            const minutos = dates.getMinutes().toString().padStart(2, '0');

            var namePast = req.session.bananao + horas + minutos;
            const uploadPath = path.join('style/uploads/',namePast);
            try {
                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, uploadPath);
            } catch (error) {
                console.log(error)
            }
        }
        
        
        
    },
    filename: function (req, file, cb) {
        const nome = req.session.id
        cb(null, nome + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (file.fieldname === 'filesReference') {
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        } else {
            callback(null, true)
        }
    }
})

module.exports = upload;