'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2),
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'url_image',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('products');
  }
};