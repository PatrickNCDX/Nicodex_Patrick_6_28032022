const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');

router.post('/signup', password, userCtrl.signup);  // Créer un compte.
router.post('/login', userCtrl.login);              // Se connecte à un compte.

module.exports = router;