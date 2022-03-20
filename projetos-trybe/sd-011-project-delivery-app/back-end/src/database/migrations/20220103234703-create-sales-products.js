'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('salesProducts', {
      saleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'sale_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'sales', // indica que nossa FOREIGN KEY está referenciando a tabela Sales;
          key: 'id', // indica qual coluna da tabela estrangeira deve ser utilizada para nossa FOREIGN KEY;
        },
      },
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'product_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'products', // indica que nossa FOREIGN KEY está referenciando a tabela Produto;
          key: 'id', // indica qual coluna da tabela estrangeira deve ser utilizada para nossa FOREIGN KEY;
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('salesProducts');
  }
};
