//importation d'Express
const express = require('express');

//créer une application express
const app = express();


/*importation connexion base de données mongoDb*/
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://SB:0wDvLif4J6o4oZib@cluster001.ihd2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  /*CORS Cross Origin Resource Sharing : systeme de sécurité qui empêche les requetes malveillantes*/
/*ces headers permettent d'accéder au serveur depuis n'importe quelle origine + d'envoyer des requêtes avec les methodes GET, POST...*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use(express.json());


  /*importation des routes*/
  const userRoutes = require ("./routes/user");
/* route auth*/

app.use("api/auth", userRoutes)

//exporter app.js pour accéder depuis un autre fichier
module.exports = app;