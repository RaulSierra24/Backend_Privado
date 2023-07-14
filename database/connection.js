const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('empresa', 'root', 'secret', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize
};
