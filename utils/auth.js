const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Définir directement la clé secrète et la durée de vie du token
const secretKey = 'dq64qs6d4q6d4q6s4dq6s4d6qs5d46q'; //  votre clé secrète
const tokenExpiry = '1h'; // Durée de vie du token

// Fonction pour générer un token JWT
function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: tokenExpiry });
}

// Fonction pour vérifier un token JWT
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
}

// Fonction pour hacher un mot de passe
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Fonction pour comparer un mot de passe avec son hachage
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Fonction pour vérifier les permissions d'un utilisateur
function checkPermissions(user, requiredRole) {
    return user.role === requiredRole;
}

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword,
    checkPermissions,
    secretKey // Exporter la clé secrète pour l'utiliser dans d'autres fichiers
};

