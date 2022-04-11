const tokenJson = require('jsonwebtoken');

// Validation userId en comparaison avec le token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = tokenJson.verify(token, 'RANDOM_TOKEN_SECRET');
        /* const decodedToken = process.env.RANDOM_TOKEN_SECRET; */
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Id utilisateur invalide';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};