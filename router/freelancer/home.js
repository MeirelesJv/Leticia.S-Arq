const express = require("express");
const router = express.Router();
const projectBase = require("../../database/project");
const ReferencesRoute = require("../../database/references");
const upload = require("../../middleware/multer");
const authJWT = require("../../middleware/authJwt");
const { Op } = require('sequelize');
const {  v4 : uuidv4  } = require("uuid");
const Users = require("../../database/users");
const workmanship = require("../../database/workmanship");


router.get("/home", authJWT, (req, res) => {
    var cliente = req.loggedUser.type
    var clienteId = req.loggedUser.id
    let User = {Name: req.loggedUser.name,Surname: req.loggedUser.surname}
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
    projectBase.findAll({ order: [['id']], include: [{ model: ReferencesRoute }], where: { Status: { [Op.ne]: 11 } } }).then(project => {

        const ReferencesRoute = project.ReferencesRoutes
        res.render("freelancer/home", {project,ReferencesRoute,cliente,clienteId,serviceMap,statusMap,User })
    })
});

router.get("/new/project", authJWT, (req, res) => {
    let User = {Name: req.loggedUser.name,Surname: req.loggedUser.surname}
    res.render("freelancer/newProject",{User})
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
    var fileDestinationS

    if (fileObgNull) {
        fileObg = fileObgNull[0];
        fileName = fileObg.filename
        fileDestination = fileObg.destination
        var filesplit = fileDestination.split('\\');
        fileDestinationS = filesplit[2]
    } else {
        fileDestination = null
        fileName = null
        fileDestinationS= null
    }

    try {

        const newProject = await projectBase.create({
            Approval: Approval,
            Name: title,
            Service: serviceSelect,
            Obs: textarea,
            File: fileName,
            FileRoute: fileDestinationS,
            Status: status,
            UserId: req.loggedUser.id,
            Uuid: code
        })

        var fileRefe = req.files.filesReference[0]
        var route = fileRefe.destination
        var fileRefeSe = route.split('\\');
        await ReferencesRoute.create({
            Name: fileRefe.filename,
            Route: fileRefeSe[2],
            Type: fileRefe.fieldname,
            ProjectId: newProject.id
        })

        res.redirect("/home")
    } catch (error) {
        res.status(400)
        res.json({ message: "Deu erro aqui" })
    }

});

router.get("/project/:Uuid",authJWT, async (req,res) =>{
    var Uuid = req.params.Uuid;
    var UserType = req.loggedUser.type;
    var UserId = req.loggedUser.id;

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

    var serviceMap = {
        rendering: 'Renderização',
        humanizedPlant: 'Planta humanizada',
        modeling: 'Modelagem 3D',
        interiorDesign: 'Projeto de Interiores'
    };

    projectBase.findOne({include: [{ model: ReferencesRoute },{ model: Users },], where: { Uuid: Uuid}}).then(project =>{
        if(!project){
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }

        const { User } = project
        const referenceRoute = project.ReferencesRoutes

        if(UserType === 1 || UserId === project.UserId){
            res.render("freelancer/project", {project,User,referenceRoute,statusMap,UserType,serviceMap})
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

router.post("/project/edit/referencesAdm",[upload.fields([{ name: 'fileReferenceAdm', maxCount: 1 }, { name: 'fileMarcenaria', maxCount: 1 },{ name: 'fileLayout', maxCount: 1 },{ name: 'fileRender', maxCount: 1 },{ name: 'filePlanta', maxCount: 1 },{ name: 'fileTecnico', maxCount: 1 },{ name: 'fileRevest', maxCount: 1 },{ name: 'filePrinc', maxCount: 1 }]),authJWT], async(req,res)=>{
    let { projectId,renderApi,prancha } = req.body

    let {fileReferenceAdm,fileMarcenaria,fileLayout,fileRender,fileTecnico,filePlanta,fileRevest,filePrinc } = req.files
    
    try {

        if(fileReferenceAdm){
            let route = fileReferenceAdm[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: fileReferenceAdm[0].filename,
                Route: fileRefeSe[2],
                Type: fileReferenceAdm[0].fieldname,
                ProjectId: projectId,
            }); 
        }
        
        if(fileMarcenaria){
            let route = fileMarcenaria[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: fileMarcenaria[0].filename,
                Route: fileRefeSe[2],
                Type: fileMarcenaria[0].fieldname,
                ProjectId: projectId,
            });
        }

        if(fileLayout){
            let route = fileLayout[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: fileLayout[0].filename,
                Route: fileRefeSe[2],
                Type: fileLayout[0].fieldname,
                ProjectId: projectId,
            });
        }

        if(fileRender){
            let route = fileRender[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: fileRender[0].filename,
                Route: fileRefeSe[2],
                Type: fileRender[0].fieldname,
                ProjectId: projectId,
            });
        }

        if(filePlanta){
            let route = filePlanta[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: filePlanta[0].filename,
                Route: fileRefeSe[2],
                Type: filePlanta[0].fieldname,
                ProjectId: projectId,
            });
        }

        if(fileTecnico){
            let route = fileTecnico[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: fileTecnico[0].filename,
                Route: fileRefeSe[2],
                Type: fileTecnico[0].fieldname,
                ProjectId: projectId,
            });
        }

        if(fileRevest){
            let route = fileRevest[0].destination
            let fileRefeSe = route.split('/');
            await ReferencesRoute.create({
                Name: fileRevest[0].filename,
                Route: fileRefeSe[2],
                Type: fileRevest[0].fieldname,
                ProjectId: projectId,
            });
        }

        if(filePrinc){
            let route = filePrinc[0].destination
            let fileRefeSe = route.split('/');
            await projectBase.update({
                ImgPrinc: filePrinc[0].filename,
                FileRoute: fileRefeSe[2],
            },{ 
                where: {
                    id: projectId
                }
            });
        }
 
        await projectBase.update({
            RenderApi: renderApi,
            Prancha: prancha
        },{ 
            where: {
                id: projectId
            }
        }); 

        console.log("sera?")
        res.status(200)
    } catch (error) {
        res.status(400)
        res.json({message: "Erro interno"});
    }
    
});

module.exports = router;