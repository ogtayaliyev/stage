const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Rapport extends Model {
        static associate(models) {
            // Définir les associations ici
            Rapport.belongsTo(models.Card, { foreignKey: 'cardId' });
            Rapport.belongsTo(models.User, { foreignKey: 'userId' });
            Rapport.belongsTo(models.Entreprise, { foreignKey: 'entrepriseId' });
        }
    }

    Rapport.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cardId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Card',
                key: 'id'
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            allowNull: false
        },
        entrepriseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Entreprise',
                key: 'id'
            },
            allowNull: false
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateRapport: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        totalHeures: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Rapport',
        freezeTableName: true
    });

    return Rapport;
};
