function userOn(req,res,next){
    if(req.session.user == undefined){
        next();
    }else{
        res.redirect("/home");
    }
}

module.exports = userOn;