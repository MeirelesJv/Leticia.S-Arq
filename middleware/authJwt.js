const jwt = require('jsonwebtoken');
const JWTSecret = 'bamlrçdkgmnaerçnoht'

function authJWT(req,res,next){
    const authToken = req.headers.authorization;
    console.log("AAAAAAAAAAAAAAAAA" + authToken)
    console.log(JSON.stringify(authToken))
    if(authToken != undefined){

        const bear = authToken.split(' ');
        var token = bear[1];

        jwt.verify(token,JWTSecret,(err,data)=>{
            if(err){
                res.status(400)
                res.json({message: "Token invalido"});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })

    }else{
        res.status(400)
        res.json({message: "Token invalido"});
    }
}

module.exports = authJWT;