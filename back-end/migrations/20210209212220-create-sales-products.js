'use strict';

const constraints = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  sale_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'sales', key: 'id' },
  },
  product_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'products', key: 'id' },
  },
  quantity: {
    allowNull: false,
    type: Sequelize.INTEGER,
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salesProductsTable = await queryInterface.createTable(
      'sales_products',
      constraints
    );
    return salesProductsTable;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales_products');
  }
};
