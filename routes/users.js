var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const authenticateToken = require('../middleware/auth');

// const authorizeRoles = require('../middleware/authorizeRoles');
const secretKey = process.env.SECRET_KEY || 'votre_clé_secrète';
const ctrl = require('../controllers/user'); // Use require instead of import

// Route pour l'inscription
router.post('/register', ctrl.register);

// Route pour la connexion
router.post('/login', ctrl.login);

// Route pour récupérer les informations du profil utilisateur
router.get('/profile', authenticateToken, ctrl.profile);

module.exports = router;
