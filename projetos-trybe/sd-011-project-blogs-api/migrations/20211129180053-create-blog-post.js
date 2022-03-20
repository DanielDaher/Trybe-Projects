'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }, // https://stackoverflow.com/questions/14653913/rename-node-js-sequelize-timestamp-columns
      updated: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }, // https://stackoverflow.com/questions/40694689/set-defaultvalue-to-todays-date-in-a-sequelize-migration
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};