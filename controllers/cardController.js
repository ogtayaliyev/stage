// controllers/cardController.js
const cardService = require('../services/cardService');

async function createCard(req, res) {
    const { titre, description, dateEcheance, listeId } = req.body;
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur depuis le token
    const tableauId = req.body.tableauId; // Récupérer l'ID du tableau depuis le corps de la requête

    try {
        const card = await cardService.createCard(tableauId, {
            titre,
            description,
            dateEcheance,
            listeId,
            userId
        });

        res.status(201).json(card);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: error.message });
    }
}

async function addToDosToCard(req, res) {
    const { cardId, todos } = req.body;

    try {
        const createdToDos = await cardService.addToDosToCard(cardId, todos);
        res.status(201).json(createdToDos);
    } catch (error) {
        console.error('Error creating ToDos:', error);
        res.status(500).json({ error: error.message });
    }
}

async function logTime(req, res) {
    const { cardId, heureDebut, heureFin } = req.body;

    try {
        const timeReport = await cardService.logTime(cardId, heureDebut, heureFin);
        res.status(201).json(timeReport);
    } catch (error) {
        console.error('Error logging time:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createCard,
    addToDosToCard,
    logTime
};
