const jwt = require('jsonwebtoken');
const JWTSecret = 'bamlrçdkgmnaerçnoht'

function authJWT(req, res, next) {
    const authToken = req.session.tokenn
    if (authToken != undefined) {

        jwt.verify(authToken, JWTSecret, (err, data) => {
            if (err) {
                res.redirect("/login");
            } else {
                req.token = authToken;
                req.loggedUser = { id: data.id, email: data.email,type: data.type };
                next();
            }
        })

    } else {
        res.redirect("/login");
    }
}

module.exports = authJWT;