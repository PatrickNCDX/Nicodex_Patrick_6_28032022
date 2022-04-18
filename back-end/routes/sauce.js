const express = require('express');

const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


const asyncRoute = f => (req, res, next) => {
    return Promise.resolve(f(req, res, next)).catch(next);
};

// Routes
router.get('/', auth, asyncRoute(sauceCtrl.getAllSauces));
router.get('/:id', auth, asyncRoute(sauceCtrl.getOneSauce));
router.post('/', auth, multer, asyncRoute(sauceCtrl.createSauce));
router.put('/:id', auth, multer, asyncRoute(sauceCtrl.modifySauce));
router.delete('/:id', auth, asyncRoute(sauceCtrl.deleteSauce));
router.post('/:id/like', auth, asyncRoute(sauceCtrl.likeOrDislike));

module.exports = router;