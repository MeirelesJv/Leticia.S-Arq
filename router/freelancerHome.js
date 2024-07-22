const express = require("express");
const router = express.Router();
const loginAuth = require("../middleware/loginAuth");

router.get("/home",loginAuth, (req,res)=>{
    res.render("freelancer/home")
});

module.exports = router;