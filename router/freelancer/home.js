const express = require("express");
const router = express.Router();
const loginAuth = require("../../middleware/loginAuth");
// const uploadMiddleware = require("../../middleware/multer")
const multer = require('multer')
const path = require('path')



router.get("/home",loginAuth, (req,res)=>{
    res.render("freelancer/home")
});

router.get("/new/project", (req,res)=>{
    res.render("freelancer/newProject")
})


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        const fileName = req.body.ad;
        cb(null, fileName + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage})

router.post("/teste/te",upload.single("files"), (req,res)=>{
   res.send("boa") 
})

module.exports = router;