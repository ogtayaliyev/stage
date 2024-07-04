const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ToDo extends Model {
        static associate(models) {
            ToDo.belongsTo(models.Card, { foreignKey: 'cardId' });
        }
    }

    ToDo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Card',
                key: 'id'
            }
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estFait: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'ToDo',
        freezeTableName: true
    });

    return ToDo;
};

