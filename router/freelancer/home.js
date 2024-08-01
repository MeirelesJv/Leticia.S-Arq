const express = require("express");
const router = express.Router();
const projectBase = require("../../database/project");
const ReferencesRoute = require("../../database/references");
const upload = require("../../middleware/multer");
const authJWT = require("../../middleware/authJwt");
const { Op } = require('sequelize');
const {  v4 : uuidv4  } = require("uuid");
const Users = require("../../database/users");

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
        12: 'Recusado'     
    }
    projectBase.findAll({ order: [['id']], include: [{ model: ReferencesRoute }], where: { Status: { [Op.ne]: 11 } } }).then(projectBase => {
        res.render("freelancer/home", {projectBase,ReferencesRoute,cliente,clienteId,serviceMap,statusMap })
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
        await ReferencesRoute.create({
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
        12: 'Recusado'    
    }

    projectBase.findOne({include: [{ model: ReferencesRoute },{ model: Users },], where: { Uuid: Uuid}}).then(project =>{
        if(!project){
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        const { User } = project
        const ReferenceRoutes = project.ReferencesRoutes[0]
        if(UserType === 1 || UserId === project.UserId){
            res.render("freelancer/project", {project,User,ReferenceRoutes,statusMap,UserType})
        }else{
            return res.status(400).json({message: "Acesso negado"})
        }
    })
});

router.post("/project/edit/approve",authJWT, async(req,res) =>{
    let {approval,projectId } = req.body

    try {
        if(approval == 2){
            await projectBase.update({
                Approval: approval,
                Status: 1,
            },{ 
                where: {
                    id: projectId
                }
            });  
        }else if(approval == 1){
            await projectBase.update({
                Approval: approval,
                Status: 12,
            },{ 
                where: {
                    id: projectId
                }
            });  
        }else{
            return res.status(400).json({ message: "Erro interno"})
        }
        
        
        
    } catch (error) {
        return res.status(400).json({ message: "Erro interno"})
    }
    
});

module.exports = router;