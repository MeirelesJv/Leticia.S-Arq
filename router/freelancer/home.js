const express = require("express");
const router = express.Router();
const projectBase = require("../../database/project");
const references = require("../../database/references");
const upload = require("../../middleware/multer");
const authJWT = require("../../middleware/authJwt");
const { Op } = require('sequelize');

//Status 

router.get("/home", authJWT, (req, res) => {
    var cliente = req.loggedUser.type
    var clienteId = req.loggedUser.id

    var serviceMap = {
        rendering: 'Renderização',
        humanizedPlant: 'Planta humanizada',
        modeling: 'Modelagem 3d',
        interiorDesign: 'Projeto de Interiores'
    };
    projectBase.findAll({ order: [['id']], include: [{ model: references }], where: { Status: { [Op.ne]: 11 } } }).then(projectBase => {
        res.render("freelancer/home", {projectBase,references,cliente,clienteId,serviceMap })
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
            UserId: req.loggedUser.id
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

module.exports = router;