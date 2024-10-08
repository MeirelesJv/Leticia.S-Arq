const jwt = require('jsonwebtoken');
const key = require('../Keys')
const JWTSecret = key.JWTSecret

function authJWT(req, res, next) {
    const authToken = req.session.tokenn
    if (authToken != undefined) {

        jwt.verify(authToken, JWTSecret, (err, data) => {
            if (err) {
                res.redirect("/login");
            } else {
                req.token = authToken;
                req.loggedUser = { id: data.id, email: data.email, type: data.type, name: data.name, surname: data.surname };
                next();
            }
        })

    } else {
        res.redirect("/login");
    }
}

module.exports = authJWT;