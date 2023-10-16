const Sequelize = require('sequelize');
const {sequelize} = require('../database');

const Fleet = sequelize.define('fleet', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    google_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    socket_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = { Fleet };