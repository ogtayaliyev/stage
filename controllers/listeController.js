// controllers/listeController.js
const { Liste } = require('../models');

async function createListe(req, res) {
    const { nom, position, tableauId } = req.body;

    try {
        const liste = await Liste.create({
            nom,
            position,
            tableauId
        });

        res.status(201).json(liste);
    } catch (error) {
        console.error('Error creating liste:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createListe
};
