var express = require('express');
var router = express.Router();
const db = require('../models');
const Client = db.Client;
const authMiddleware = require('../middleware/auth');

// Route pour ajouter un client
router.post('/', authMiddleware, async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour lire tous les clients
router.get('/', authMiddleware, async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour lire un client par ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour mettre à jour un client
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      await client.update(req.body);
      res.status(200).json(client);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un client
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      await client.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
