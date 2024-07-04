const { Model, DataTypes } = require('sequelize');

//•	ID Liste (PK)
// •	Nom
// •	Position
// •	ID Tableau (FK)

module.exports = (sequelize) => {
    class Liste extends Model {
        static associate(models) {
            Liste.belongsTo(models.Tableau, {foreignKey: 'tableauId'});
        }
    }

    Liste.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tableauId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }
        , {
            sequelize,
            modelName: 'Liste',
            freezeTableName: true
        });

    return Liste;
}