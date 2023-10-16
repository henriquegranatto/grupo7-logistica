const Sequelize = require('sequelize');
const {sequelize} = require('../database');
const { Fleet } = require('./fleet');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fleet: {
        type: Sequelize.BIGINT,        
        // references: {
        //     model: Fleet,
        //     key: 'id'
        // },
        allowNull: true
    },
    origin_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    origin_latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    origin_longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    destiny_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destiny_latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    destiny_longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = { Order };