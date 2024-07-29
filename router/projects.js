const express = require("express");
const router = express.Router();

router.get("/project/consultorio",(req,res)=>{
    res.render("projects/consultorio")
});

router.get("/project/dancefloor",(req,res)=>{
    res.render("projects/dancefloor")
});

router.get("/project/desenhos",(req,res)=>{
    res.render("projects/desenhos")
});

router.get("/project/recanto",(req,res)=>{
    res.render("projects/recanto")
});

router.get("/project/studiok",(req,res)=>{
    res.render("projects/studiok")
});

router.get("/project/suite",(req,res)=>{
    res.render("projects/suite")
});

module.exports = router;