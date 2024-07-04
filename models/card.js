const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Card extends Model {
        static associate(models) {
            Card.belongsTo(models.Liste, { foreignKey: 'listeId' });
            Card.belongsTo(models.Tableau, { foreignKey: 'tableauId' });
            Card.belongsTo(models.User, { foreignKey: 'userId' });
            Card.hasMany(models.ToDo, { foreignKey: 'cardId' });
            Card.hasMany(models.TimeReport, { foreignKey: 'cardId' });
        }
    }

    Card.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreation: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        dateEcheance: {
            type: DataTypes.DATE,
            allowNull: false
        },
        listeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Liste',
                key: 'id'
            }
        },
        tableauId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tableau',
                key: 'id'
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        totalHours: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Card',
        freezeTableName: true
    });

    return Card;
};
