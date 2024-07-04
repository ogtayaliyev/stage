// routes/cards.js
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authenticateToken = require('../middleware/auth');

// Route pour créer une carte
router.post('/create',authenticateToken, cardController.createCard);

// Route pour ajouter des ToDos à une carte
router.post('/add-todos',authenticateToken, cardController.addToDosToCard);

// Route pour enregistrer le temps passé sur une carte
router.post('/long-time', authenticateToken, cardController.logTime);

module.exports = router;