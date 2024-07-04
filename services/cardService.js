// services/cardService.js
const { Card, Tableau, Liste, ToDo, TimeReport } = require('../models');

async function createCard(tableauId, cardData) {
    try {
        // Vérifiez si le tableau existe
        const tableau = await Tableau.findByPk(tableauId);
        if (!tableau) {
            throw new Error('Tableau not found');
        }

        // Vérifiez si la liste existe
        const liste = await Liste.findByPk(cardData.listeId);
        if (!liste) {
            throw new Error('Liste not found');
        }

        // Créez la carte et liez-la au tableau
        const card = await Card.create({
            ...cardData,
            tableauId: tableau.id
        });

        return card;
    } catch (error) {
        console.error('Error in createCard:', error);
        throw error;
    }
}

async function addToDosToCard(cardId, todosData) {
    try {
        // Vérifiez si la carte existe
        const card = await Card.findByPk(cardId);
        if (!card) {
            throw new Error('Card not found');
        }

        // Créez les ToDos et liez-les à la carte
        const todos = await Promise.all(todosData.map(todoData => {
            return ToDo.create({
                ...todoData,
                cardId: card.id
            });
        }));

        return todos;
    } catch (error) {
        console.error('Error in addToDosToCard:', error);
        throw error;
    }
}

async function logTime(cardId, heureDebut, heureFin) {
    try {
        // Vérifiez si la carte existe
        const card = await Card.findByPk(cardId);
        if (!card) {
            throw new Error('Card not found');
        }

        // Créez le rapport de temps
        const timeReport = await TimeReport.create({
            cardId,
            heureDebut,
            heureFin
        });

        // Mettez à jour le total des heures travaillées sur la carte
        const totalHours = await TimeReport.sum('totalHours', { where: { cardId } });
        card.totalHours = totalHours;
        await card.save();

        return timeReport;
    } catch (error) {
        console.error('Error in logTime:', error);
        throw error;
    }
}

module.exports = {
    createCard,
    addToDosToCard,
    logTime
};
