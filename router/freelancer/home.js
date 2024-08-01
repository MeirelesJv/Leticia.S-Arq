const express = require("express");
const router = express.Router();
const projectBase = require("../../database/project");
const references = require("../../database/references");
const upload = require("../../middleware/multer");
const authJWT = require("../../middleware/authJwt");
const { Op } = require('sequelize');
const {  v4 : uuidv4  } = require("uuid");

//Status 

router.get("/home", authJWT, (req, res) => {
    var cliente = req.loggedUser.type
    var clienteId = req.loggedUser.id

    var serviceMap = {
        rendering: 'Renderização',
        humanizedPlant: 'Planta humanizada',
        modeling: 'Modelag3d',
        interiorDesign: 'Projeto de Interiores'
    };

    var statusMap = {
        0: 'Solicitação Pendente',
        1: 'Alinhamento do Projeto',
        2: 'Desenvolvimento',
        3: 'Desenvolvimento  Layout',
        4: 'Desenvolvimento  Marcenaria',
        5: 'Desenvolvimento  Revestimentos',
        6: 'Desenvolvimento  Acabamentos',
        7: 'Modelagem 3D',
        8: 'Renderização',
        9: 'Detalhamento Tecnico',
        10: 'Planta Humanizada',
        11: 'Concluido',        
    }
    projectBase.findAll({ order: [['id']], include: [{ model: references }], where: { Status: { [Op.ne]: 11 } } }).then(projectBase => {
        res.render("freelancer/home", {projectBase,references,cliente,clienteId,serviceMap,statusMap })
    })
});

router.get("/new/project", authJWT, (req, res) => {
    res.render("freelancer/newProject")
});

router.post("/project", [upload.fields([{ name: 'filesReference', maxCount: 1 }, { name: 'files', maxCount: 1 },]), authJWT], async (req, res) => {
    let { title, serviceSelect, textarea } = req.body
    let Approval = '0'
    let status = '0'
    var fileObgNull = req.files.files;
    var fileName
    var fileDestination
    var fileObg
    var code = uuidv4();

    if (fileObgNull) {
        fileObg = fileObgNull[0];
        fileName = fileObg.filename
        fileDestination = fileObg.destination
    } else {
        fileDestination = null
        fileName = null
    }

    try {
        const newProject = await projectBase.create({
            Approval: Approval,
            Name: title,
            Service: serviceSelect,
            Obs: textarea,
            File: fileName,
            FileRoute: fileDestination,
            Status: status,
            UserId: req.loggedUser.id,
            Uuid: code
        })

        var fileRefe = req.files.filesReference[0]
        await references.create({
            Name: fileRefe.filename,
            Route: fileRefe.destination,
            ProjectId: newProject.id
        })

        res.redirect("/home")
        console.log('deu')
    } catch (error) {
        res.status(400)
        res.json({ message: "Deu erro aqui" })
        console.log(error)
    }

});

router.get("/project/:Uuid",authJWT, async (req,res) =>{
    var Uuid = req.params.Uuid;
    var UserType = req.loggedUser.type
    var UserId = req.loggedUser.id

    projectBase.findOne({include: [{ model: references }], where: { Uuid: Uuid}}).then(project =>{
        if(UserType === 1 || UserId === project.UserId){
            res.render("freelancer/project", {project})
        }else{
            res.status(400).json({message: "Acesso negado"})
        }
    })
});

module.exports = router;