/*importer mongoose pour la connexion à la base de données*/
const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://NGOZONGOZO:0rC1Ux68XBqscWF8@clusterapi-piiquante.lbr95.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {userNewUrlParser: true, UnifiedTopology: true})
.then(() => console.log("connexion à MD réussie"))
.catch(() => console.log("connexion à MD échouée"));


module.exports = mongoose;