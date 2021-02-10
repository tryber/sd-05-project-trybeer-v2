'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      name: {
        type: Sequelize.STRING, allowNull: false,
      },
      email: {
        type: Sequelize.STRING, unique: true, allowNull: false,
      },
      password: {
        type: Sequelize.STRING, allowNull: false,
      },
      role: {
        type: Sequelize.STRING, allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
