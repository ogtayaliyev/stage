const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: console.log, 
});

module.exports = sequelize;
