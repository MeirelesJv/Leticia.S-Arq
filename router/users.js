const express = require("express");
const router = express.Router();

router.get("/login",(req,res)=>{
    res.render("users/login")
});

router.get("/", (req,res)=> {
    res.render("index")
});

router.get("/register", (req,res)=>{
    res.render("users/register")
})

module.exports = router;