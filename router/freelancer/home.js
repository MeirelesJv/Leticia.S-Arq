const express = require("express");
const router = express.Router();
const loginAuth = require("../../middleware/loginAuth");
const projectBase = require("../../database/project");
const references = require("../../database/references");
const uploadMiddleware = require("../../middleware/multer");
const authJWT = require("../../middleware/authJwt")



router.get("/home",authJWT, (req,res)=>{
    res.render("freelancer/home")
});

router.get("/new/project", (req,res)=>{
    res.render("freelancer/newProject")
});

router.post("/project",uploadMiddleware.fields([{name: 'files',maxCount: 1},{name: 'filesReference',maxCount: 1}]), (req,res)=>{
    let{title,serviceSelect,textarea} = req.body
    console.log(req.session)
    
});

module.exports = router;