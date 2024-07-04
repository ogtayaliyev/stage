// models/tableau.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Tableau extends Model {
        static associate(models) {
            Tableau.belongsTo(models.User, { foreignKey: 'userId' });
            Tableau.hasMany(models.Card, { foreignKey: 'tableauId' }); // Assurez-vous que cette ligne est présente
        }
    }

    Tableau.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Tableau',
        freezeTableName: true
    });

    return Tableau;
};
