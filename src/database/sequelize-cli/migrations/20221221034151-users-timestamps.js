'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'created_at', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('users', 'updated_at', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('users', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'deleted_at');
    await queryInterface.removeColumn('users', 'updated_at');
    await queryInterface.removeColumn('users', 'created_at');
  },
};
