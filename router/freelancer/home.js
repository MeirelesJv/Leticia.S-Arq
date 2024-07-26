const express = require("express");
const router = express.Router();
const projectBase = require("../../database/project");
const references = require("../../database/references");
const uploadMiddleware = require("../../middleware/multer");
const authJWT = require("../../middleware/authJwt")



router.get("/home", (req,res)=>{
    res.render("freelancer/home")
});

router.get("/new/project", (req,res)=>{
    res.render("freelancer/newProject")
});

router.post("/project",uploadMiddleware.fields([{name: 'files',maxCount: 1},{name: 'filesReference',maxCount: 1}]), async (req,res)=>{
    let{title,serviceSelect,textarea} = req.body
    // var Approval = '0'
    // var status = '0'
    console.log(req.files)
    console.log(title)
    console.log(serviceSelect)
    // try {
    //     await projectBase.create({
    //         Approval: Approval,
    //         name: title,
    //         Service: serviceSelect,
    //         Obs: textarea,
    //         ArchitecturalProject: null,
    //         Mockup: null,
    //         NeedProgram: null,
    //         Status: status,
    //         UserId: req.loggedUser.id
    //     })
    // } catch (error) {
    //     res.status(400)
    //     res.json({message: "Deu erro aqui"})
    // }
    
});

module.exports = router;