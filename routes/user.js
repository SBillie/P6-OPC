/*importation d'express*/
const express = require('express');

/*package pour limiter le nombre de requete à l'application */
const rateLimit = require('express-rate-limit');  

//importation du controllers/user.js
const userController = require("../controllers/user");

/*fonction Router*/
const router = express.Router();

/*route (endpoint) signup*/

const Limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes : temps défini pour tester l'application
    max: 3 // 3 essais max par adresse ip
  });
  
  router.post('/signup', userController.signup);

  /* application de rate limit au login de l'user*/
  router.post('/login', Limiter, userController.login); 
  
  
  module.exports = router;