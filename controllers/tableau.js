const db = require('../models');
const Tableau = db.Tableau;

const createTableau = async function(req, res, next) {
    try {
        const { nom, description } = req.body;
        const userId = req.user.id; //utilisateur est authentifié et que req.user est défini

        const tableau = await Tableau.create({ nom, description, userId });
        res.status(201).json({ message: 'Tableau created successfully', tableau });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createTableau
};
