'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      password: '12345',
      email: 'tungchuthanh1234@gmail.com',
      firstName: 'Tung',
      lastName: 'Chu',
      address: '67 297 Tran Cung',
      gender: 1,
      roleId: 'R1',
      image: '1',
      phoneNumber: '0979611820',
      positionId: 'P1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};