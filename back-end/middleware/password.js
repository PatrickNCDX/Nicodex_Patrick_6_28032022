const passwordSchema = require('../models/password');
const status = require('http-status');

module.exports = (req, res, next) => {

    if (!passwordSchema.validate(req.body.password)) {
        res.status(status.BAD_REQUEST).json({
            message: "Le mot de passe n'est pas conforme. Réessayez avec au moins six caractères dont un caractère spécial, une majuscule et deux chiffres"
        })
    } else {
        next();
    }
}