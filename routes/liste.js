// routes/liste.js
const express = require('express');
const router = express.Router();
const listeController = require('../controllers/listeController');
const authenticateToken = require('../middleware/auth');

// Route pour créer une liste
router.post('/create', authenticateToken, listeController.createListe);

module.exports = router;
``
