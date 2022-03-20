'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users', // indica que nossa FOREIGN KEY está referenciando a tabela User;
          key: 'id', // indica qual coluna da tabela estrangeira deve ser utilizada para nossa FOREIGN KEY;
        },
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'seller_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users', // indica que nossa FOREIGN KEY está referenciando a tabela User;
          key: 'id', // indica qual coluna da tabela estrangeira deve ser utilizada para nossa FOREIGN KEY;
        },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2), // conferir se isso existe
        field: 'total_price',
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'delivery_address',
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'delivery_number',
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'sale_date',
        defaultValue: Sequelize.fn('now'),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'status',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('sales');
  }
};
