const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {dialect: 'postgres'});
module.exports = {sequelize}