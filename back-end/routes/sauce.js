const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce);               // Récupère toutes les sauces.
router.get('/:id', auth, sauceCtrl.getOneSauce);            // Récupère une seule sauce.
router.post('/', auth, multer, sauceCtrl.createSauce);      // Créer une sauce.
router.put('/:id', auth, multer, sauceCtrl.modifySauce);    // Modifie une sauce.
router.delete('/:id', auth, sauceCtrl.deleteSauce);         // Supprime une sauce.
router.post('/:id/like', auth, sauceCtrl.likeSauce);        // Aimer une sauce.

module.exports = router;