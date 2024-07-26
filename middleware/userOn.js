function userOn(req,res,next){
    if(req.session.token == undefined){
        next();
    }else{
        res.redirect("/home");
    }
}

module.exports = userOn;