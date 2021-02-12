'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (queryInterface.createTable('sale_products', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      product_id: {
        allowNull: false, type: Sequelize.INTEGER, primaryKey: true, onUpdate: 'CASCADE',
        onDelete: 'CASCADE', references: { model: 'products', key: 'id' },
      },
      quantity: {
        type: Sequelize.INTEGER, allowNull: false,
      },
      sale_id: {
        allowNull: false, type: Sequelize.INTEGER, primaryKey: true, onUpdate: 'CASCADE',
        onDelete: 'CASCADE', references: { model: 'sales', key: 'id' },
      },
    }));
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sale_products');
  }
};
