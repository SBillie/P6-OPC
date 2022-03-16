//importation de mongoose
const mongoose = require('mongoose');

/*Package pour vérifier que l'email n'est pas déjà enregistré*/
const uniqueValidator = require('mongoose-unique-validator');

//modèle de singup pour enregistrer un nouvel utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model('user', userSchema);