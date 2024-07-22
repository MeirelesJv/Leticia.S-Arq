const express = require("express");
const router = express.Router();
const users = require("../database/users")
const bcrypt = require("bcryptjs")

router.get("/login",(req,res)=>{
    res.render("users/login")
});

router.get("/register", (req,res)=>{
    res.render("users/register")
})


router.post("/users/register", async (req,res)=>{
    let {name,surname,email,cpf,birth,password,tel,cep,road,neighborhood,uf,city} = req.body
    const type = "1"

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
})

router.post("/users/login", async (req,res)=>{
    let {email,password} = req.body

    users.findOne({where:{Email: email}}).then( user => {
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.Password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.Email
                }
                //res.json(req.session.user);
                 res.redirect("/home")
            }else{
                return res.status(400).json({message: "Email já cadastrado"});
            }
        }else{
            return res.status(400).json({message: "Email já cadastrado"});
        }
    })

})

router.get("/logout",(req,res) =>{
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;