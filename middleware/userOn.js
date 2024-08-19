function userOn(req,res,next){
    if(req.session.tokenn == undefined){
        next();
    }else{
        res.redirect("/home");
    }
}

module.exports = userOn;