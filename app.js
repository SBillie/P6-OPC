//importation d'Express
const express = require('express');

//créer une application express
const app = express();

//app.use (vient du framework express) route général et la fonction middlware
app.use((req,res,next) => {
    console.log("première vraie");
});

app.use((req,res) => {
    res.json({message: "ça ne fonctionne pas"})
});

//exporter app.js pour accéder depuis un autre fichier
module.exports = app;