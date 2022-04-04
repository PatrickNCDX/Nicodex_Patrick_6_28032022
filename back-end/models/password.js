const validPassword = require('password-validator');
const passwordSchema = new validPassword();

//Le mot de passe doit respecter le schéma suivant.
passwordSchema
    .has().uppercase(1)            // Minimum une majuscule.
    .has().digits(2)               // Minimum deux chiffres.
    .has().not().spaces()          // Pas d'espaces.
    .has().symbols()               // Minimum un caractère spécial.
    .has().not().symbols(2)        // Maximum deux caractères spéciaux.
    .is().min(6)                   // Minimum six caractères.
    .is().max(15)                  // Maximum quinze caractères.

module.exports = passwordSchema;