const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {}

  Role.init({
    name: {
      type: DataTypes.STRING,
      values:['Admin', 'Client', 'Stagiaire'],
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    freezeTableName: true
  });

  return Role;
};
