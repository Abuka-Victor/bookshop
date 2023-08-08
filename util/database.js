const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node', 'root', 'victorsql', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
