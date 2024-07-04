const { verifyToken, generateToken, secretKey } = require('../utils/auth');
const db = require('../models');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // Si aucun token n'est fourni, renvoyer une réponse 401

  try {
    const decoded = await verifyToken(token);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404
      return res.status(404).send({ auth: false, message: 'User not found.' });
    }

    // Si l'utilisateur est trouvé, vérifier si le token est proche de l'expiration
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    const tokenExpirationTime = decoded.exp; // Temps d'expiration du token en secondes

    if (tokenExpirationTime - currentTime < 300) { // Si le token expire dans moins de 5 minutes (300 secondes)
      // Régénérer un nouveau token
      const newToken = generateToken(user);
      res.setHeader('Authorization', `Bearer ${newToken}`); // Ajouter le nouveau token dans l'en-tête de la réponse
    }

    // Ajouter les informations de l'utilisateur à la requête pour les prochaines étapes
    req.user = { id: user.id, role: user.role };
    next(); // Passer au middleware ou à la route suivante
  } catch (err) {
    return res.status(403).send({ auth: false, message: 'Token is invalid or expired.' });
  }
}

module.exports = authenticateToken; // Exporter le middleware pour l'utiliser dans d'autres fichiers
``
