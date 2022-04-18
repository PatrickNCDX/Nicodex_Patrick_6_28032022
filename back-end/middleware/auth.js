const tokenJson = require('jsonwebtoken');

require('dotenv').config();

// Validation userId en comparaison avec le token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
        const decodedToken = tokenJson.verify(token, RANDOM_TOKEN_SECRET);

        const userId = decodedToken.userId;

        req.userId = userId;

        next();

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};
