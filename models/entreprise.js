const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Entreprise extends Model {
        static associate(models) {
            // Définir les associations ici si nécessaire
            // Par exemple, si une entreprise a plusieurs utilisateurs :
            // Entreprise.hasMany(models.User, { foreignKey: 'entrepriseId' });
        }
    }

    Entreprise.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codePostal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    }, {
        sequelize,
        modelName: 'Entreprise',
        freezeTableName: true
    });

    return Entreprise;
};
