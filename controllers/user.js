/*importation models de la base de données user.js*/
const User = require('../models/User');


/*module de hachage securisé pour chiffrer les données rendant leur lecture impossible par un utilisateur malveillant 
utilisation d'un hash = chaine chiffrée pour crypter le mdp*/
const bcrypt = require('bcrypt');

/*package pour créer et verifier les tokens d'authentification */
const jwt = require('jsonwebtoken');

/*cache une partie de l'email*/
const MaskData = require('maskdata');

/*crypte le mdp*/
const passwordValidator = require('password-validator'); 

 //le schema que doit respecter le mot de passe

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // longueur mini 8
.is().max(100)                                  // longueur maxi 20
.has().uppercase()                              // doit contenir des majuscules
.has().lowercase()                              // doit contenir des minuscules
.has().digits(2)                                // doit contenir deux chiffres
.has().not().spaces();                         // ne doit pas contenir d'espace


/*signup pour enregistrer un nouvel utilisateur dans la base de données*/
exports.signup = (req, res, next) => { // inscription du user
    if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) { // si l'email et le mot de passe ne sont pas valides
      return res.status(400).json({ message: 'Check your email address format and your password should be at least 8 characters long, contain uppercase, lowercase letter and digit '});
      
    } else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) { // s'ils sont valides
    const maskedMail = MaskData.maskEmail2(req.body.email); // masquage de l'adresse mail
        bcrypt.hash(req.body.password, 10) // bcrypt hashe le mot de passe
        .then(hash => {
          
            const user = new User ({        // crée un nouveau user
                email: maskedMail, // l'adresse mail masquée 
                password: hash
            });

            user.save()   // et mongoose le stocke dans la bdd
            .then(hash => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
        }
    };

    exports.login = (req, res, next) => { // connexion du user
        const maskedMail = MaskData.maskEmail2(req.body.email);
          User.findOne({ email: maskedMail }) // on vérifie que l'adresse mail figure bien dan la bdd
            .then(user => {
              if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
              }
              bcrypt.compare(req.body.password, user.password) // on compare les mots de passes
                .then(valid => {
                  if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  res.status(200).json({ 
                    userId: user._id,
                    token: jwt.sign( // on génère un token de session pour le user maintenant connecté
                        { userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'}
                    )
                    
                  })
                  
                })
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        };