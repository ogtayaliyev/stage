const { checkPermissions } = require('../utils/auth'); // Importer la fonction checkPermissions

//Utilisez la fonction checkPermissions pour vérifier si l'utilisateur a les permissions nécessaires.
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !checkPermissions(req.user, allowedRoles)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

module.exports = authorizeRoles;
