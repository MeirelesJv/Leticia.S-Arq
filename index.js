const express = require('express');
const app = express()
const bodyParser = require("body-parser");

app.use(express.static('style'));

//Ejs
app.set('view engine','ejs');

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Express
app.listen(8080,()=>{console.log("Rodando!");});

//Rotas
const users = require("./router/users")
app.use("/", users);