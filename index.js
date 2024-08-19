const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");
const key = require("./Keys");

app.use(express.static('style'));

//Ejs
app.set('view engine','ejs');

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//session
app.use(session({
    secret: key.sessionPassword, cookie:{maxAge: null}
}))


//Express
app.listen(8080,()=>{console.log("Rodando!");});

app.get("/", (req,res)=> {
    res.render("index")
});

//Rotas
const users = require("./router/users");
const freelancerHome = require('./router/freelancer/home');
const projects = require('./router/projects');
app.use("/", users,freelancerHome,projects);

connection.authenticate().then(() =>{
    console.log("Banco conectado!");
}).catch((error) =>{
    console.log(error);
})

const cors = require("cors")
app.use(cors())