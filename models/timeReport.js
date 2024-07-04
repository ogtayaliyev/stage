const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class TimeReport extends Model {
        static associate(models) {
            TimeReport.belongsTo(models.Card, { foreignKey: 'cardId' });
        }

        // Méthode pour calculer la durée en heures entre heureDebut et heureFin
        calculateDuration() {
            const durationInMilliseconds = new Date(this.heureFin) - new Date(this.heureDebut);
            const durationInMinutes = durationInMilliseconds / (1000 * 60);
            const durationInHours = durationInMinutes / 60;
            return durationInHours;
        }
    }

    TimeReport.init({
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
        heureDebut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        heureFin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalHours: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        reportDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'TimeReport',
        freezeTableName: true,
        hooks: {
            beforeSave: (timeReport) => {
                timeReport.totalHours = timeReport.calculateDuration();
            }
        }
    });

    return TimeReport;
};
