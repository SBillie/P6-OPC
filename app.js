//importation d'Express
const express = require('express');

//créer une application express
const app = express();

/*importation de morgan (logger htpp)*/
const morgan = require("morgan");

/* logger les requests et responses*/
app.use(morgan("dev"));

/*importation connexion base de données mongoDb*/
const mongoose = require("./db/db");

//app.use (vient du framework express) route général et la fonction middlware
app.use((req,res,next) => {
    console.log("première vraie");
    next();
});

app.use((req,res,next) => {
    res.status(201);
    next();
});
app.use((req,res,) => {
    res.json({message: "ça fonctionne graaaave"});

});



//exporter app.js pour accéder depuis un autre fichier
module.exports = app;