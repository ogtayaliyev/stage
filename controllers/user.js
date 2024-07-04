const db = require('../models');
const { hashPassword, comparePassword, generateToken, secretKey } = require('../utils/auth'); // Importer les fonctions nécessaires
const User = db.User;

const register = async function(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password); // Utiliser la fonction hashPassword
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await comparePassword(password, user.password))) { // Utiliser la fonction comparePassword
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const profile = async function(req, res, next) {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    profile
};
