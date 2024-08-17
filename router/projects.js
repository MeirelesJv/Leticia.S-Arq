const express = require("express");
const router = express.Router();

router.get("/consultorio",(req,res)=>{
    res.render("projects/consultorio")
});

router.get("/dancefloor",(req,res)=>{
    res.render("projects/dancefloor")
});

router.get("/desenhos",(req,res)=>{
    res.render("projects/desenhos")
});

router.get("/recanto",(req,res)=>{
    res.render("projects/recanto")
});

router.get("/studiok",(req,res)=>{
    res.render("projects/studiok")
});

router.get("/suite",(req,res)=>{
    res.render("projects/suite")
});

module.exports = router;