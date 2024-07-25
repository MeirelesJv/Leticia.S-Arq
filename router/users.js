const express = require("express");
const router = express.Router();
const users = require("../database/users");
const bcrypt = require("bcryptjs");
const passwordRecover = require("../database/passwordReset");
const envioEmail = require("./Email/email");
const {  v4 : uuidv4  } = require("uuid");
const userOn = require("../middleware/userOn");
const jwt = require("jsonwebtoken");

const JWTSecret = 'bamlrçdkgmnaerçnoht'

router.get("/login",userOn, (req,res)=>{
    res.render("users/login")
});

router.get("/register",userOn ,(req,res)=>{
    res.render("users/register")
});

router.get("/recover/email",userOn, (req,res)=>{
    res.render("users/recoverEmail")
});

router.get("/login/recover",userOn, (req,res)=>{
    res.render("users/recover")
});

router.get("/logout",(req,res) =>{
    req.session.user = undefined;
    res.redirect("/");
});

router.post("/users/register", async (req,res)=>{
    let {name,surname,email,cpf,birth,password,tel,cep,road,neighborhood,uf,city} = req.body
    const type = "0"

    try {
        //Validar email
        let existingEmail = await users.findOne({ where: {Email: email}});
        if(existingEmail == undefined){

            let existingCpf = await users.findOne({ where: {Cpf: cpf}});
            if(existingCpf == undefined){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                await users.create({
                    Name: name,
                    Surname: surname,
                    Email: email,
                    Cpf: cpf,
                    Birth: birth,
                    Password: hash,
                    Tel: tel,
                    Type: type,
                    Cep: cep,
                    Road: road,
                    Neighborhood: neighborhood,
                    Uf: uf,
                    City: city,
                })

                res.redirect('/');
            }else{
                return res.status(402).json({message: "Cpf já cadastrado"});
            }
        }else{
            return res.status(401).json({message: "Email já cadastrado"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post("/users/login", async (req,res)=>{
    let {email,password} = req.body

    users.findOne({where:{Email: email}}).then( user => {
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.Password);
            if(correct){
                
                try {
                    var token = jwt.sign({ id: users.id,email: users.Email,type: users.Type }, JWTSecret, { expiresIn: '1h' });
                    res.status(200);
                    res.json({token: token})
                } catch (error) {
                    res.status(400);
                    res.json({message: "Falha interna"})
                }
                // jwt.sign({id: users.id,email: users.Email,type: users.Type},JWTSecret,{expiresIn: '120h'},(err, token)=>{
                //     if(err){
                        // res.status(400);
                        // res.json({message: "Falha interna"})
                        // var decoded = jwt.verify(token, JWTSecret);
                        // console.log(token)
                        // console.log(decoded)
                //     }else{
                //         res.status(200);
                //         res.json({token: token})
                //         console.log(token)
                //     }
                // });

                //res.json(req.session.user);
                //  res.redirect("/home")
            }else{
                return res.status(400).json({message: "Email ou Senha incompativeis"});
            }
        }else{
            return res.status(400).json({message: "Email ou Senha incompativeis"});
        }
    })

});

router.post("/users/recover/email", async (req,res)=>{
    let {email} = req.body
    var token = uuidv4()
    
    let existingEmail = await users.findOne({ where: {Email: email}});
    if(existingEmail != undefined){
        
        await passwordRecover.create({
            Token: token,
            Email: email,
            Use: '0'
        })

        await envioEmail.sendMail({
            from: "Joao Vitor <meirelesDev@hotmail.com>",
            to: email,
            subject: "Recuperação de Senha!",
            text: "Token de recuperação de senha: <br>" + token,
        });

        res.redirect('/login/recover')

    }else{
        return res.status(400).json({message: "Email não encontrado"})
    }
});

router.post("/users/recover", async (req,res)=>{
    let {password,token} = req.body

    const tokenValid = await passwordRecover.findOne({where: {Token: token}})
    if(tokenValid != undefined){
        var email = tokenValid.dataValues.Email
        if(tokenValid.dataValues.Use === '0'){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            await users.update({Password: hash},{
                where: {
                    Email: email
                }
            })
            await passwordRecover.update({Use: '1'},{
                where: {
                    Token: token
                }
            })

            res.redirect("/login")
            return res.status(200)
        }else{
            return res.status(400).json({message: "Token Invalido"})
        }
    }else{
        return res.status(400).json({message: "Token Invalido"})
    }
});

module.exports = router;