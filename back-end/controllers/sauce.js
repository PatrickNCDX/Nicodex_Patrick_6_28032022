const Sauce = require('../models/sauce');
const fs = require('fs');

// Logiques métiers pour les sauces
// Lecture de toutes les sauces dans la base de données (Get)
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Lecture d'une sauce avec son ID (Get/:id)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Création d'une nouvelle sauce (Post)
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

    // Création d'un nouvel objet Sauce
    const sauce = new Sauce({
        ...sauceObject,
        // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistrement de l'objet sauce dans la base de données
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce (Update)
exports.modifySauce = (req, res, next) => {
    if (req.file) {
        // Si il existe déjà une image
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    // Si il n'existe pas d'image
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {

        const sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

// Suppression d'une sauce (Delete)
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Récupération du nom du fichier
            const filename = sauce.imageUrl.split('/images/')[1];
            // On efface le fichier (unlink)
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Création like ou dislike (Post/:id/like)
exports.likeOrDislike = (req, res, next) => {
    let like = req.body.like //Initialiser le statut Like
    let userId = req.body.userId //Recuperation de userId
    let sauceId = req.params.id //Récupération de la sauce
    //Si l'utilisateur like
    if (like === 1) {
        Sauce.updateOne(
            { _id: sauceId },
            {
                $push: { usersLiked: userId },
                $inc: { likes: 1 }
            })

            .then(() => res.status(200).json({ message: 'Vous aimez cette sauce !!!' }))
            .catch(error => res.status(400).json({ error }));
    }
    //Si l'utilisateur Dislike
    if (like === -1) {
        Sauce.updateOne(
            { _id: sauceId },
            {
                $push: { usersDisliked: userId },
                $inc: { dislikes: 1 }
            })

            .then(() => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce !!!' }))
            .catch(error => res.status(400).json({ error }));
    }
    //Annulation d'un like ou dislike
    if (like === 0) {
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                //Si l'utilisateur annule un like
                if (sauce.usersLiked.find(user => user === userId)) {
                    Sauce.updateOne(
                        { _id: sauceId },
                        {
                            $pull: { usersLiked: userId },
                            $inc: { likes: -1 }
                        })

                        .then(() => res.status(200).json({ message: 'Votre avis a été annulé' }))
                        .catch(error => res.status(400).json({ error }));
                }
                //Si l'utilisateur annule un dislike
                if (sauce.usersDisliked.find(user => user === userId)) {
                    Sauce.updateOne(
                        { _id: sauceId },
                        {
                            $pull: { usersDisliked: userId },
                            $inc: { dislikes: -1 }
                        })

                        .then(() => res.status(200).json({ message: 'Votre avis a été annulé' }))
                        .catch(error => res.status(400).json({ error }));
                }

            })
            .catch((error) => res.status(404).json({ error }))

    }
};