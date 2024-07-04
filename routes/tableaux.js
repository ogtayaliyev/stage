const express = require('express');
const router = express.Router();
const { createTableau } = require('../controllers/tableau');
const authenticateToken = require('../middleware/auth'); // Assurez-vous que l'utilisateur est authentifié

// Route pour créer un tableau
router.post('/', authenticateToken, createTableau);

module.exports = router;
