const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
    },
});

module.exports = Order;
