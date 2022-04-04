const mongoose = require('mongoose');

const sauce = mongoose.Schema({
    userId: { type: String, required: true },                   // Id de l'utilisateur qui a crée la sauce.
    name: { type: String, required: true },                     // Nom de la sauce.
    manufacturer: { type: String, required: true },             // Fabricant de la sauce.
    description: { type: String, required: true },              // Description de la sauce.
    mainPepper: { type: String, required: true },               // Nom de l'ingrédient principal de la sauce.
    imageUrl: { type: String, required: true },                 // Image de la sauce.
    heat: { type: Number, required: true },                     // Force de la sauce.
    likes: { type: Number, required: false, default: 0 },       // Nombres d'utilisateurs qui aime la sauce.
    usersLiked: { type: Array, required: false },               // Tableau des utilisateurs qui ont aimé la sauce.
    dislikes: { type: Number, required: false, default: 0 },    // Nombres d'utilisateurs qui n'ont pas aimé la sauce.
    usersDisliked: { type: Array, required: false }             // Tableau des utilisateurs qui n'ont pas aimé la sauce.
});

module.exports = mongoose.model('Sauce', sauce);