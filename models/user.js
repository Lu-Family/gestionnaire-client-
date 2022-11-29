const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
   
  },
  LastName: {
    type: String,


  },
  firstName: {
    type: String,

  }
  
},{
timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
}});



var options = {
  MissingPasswordError: 'Aucun mot de passe n\' a été fourni',
  AttemptTooSoonError: 'Le compte est actuellement verrouillé. Réessayez plus tard',
  TooManyAttemptsError: 'Compte verrouillé en raison d\'un trop grand nombre de tentatives de connexion',
  NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
  IncorrectPasswordError: 'Le mot de passe est incorrect',
  IncorrectUsernameError: 'Le nom d\'utilisateur ou l\'adresse email sont incorrects',
  MissingUsernameError: 'Aucun nom d\'utilisateur n\' a été fourni',
  UserExistsError: 'Un utilisateur avec ce nom est déjà enregistré'
  
  };
 // Account.plugin(passportLocalMongoose, { usernameField: 'email', errorMessages : { UserExistsError : 'A user with the given email is already registered.' } });


userSchema.plugin(passportLocalMongoose,  {usernameField: 'email' || 'username', errorMessages: options});
module.exports = mongoose.model("User", userSchema);
