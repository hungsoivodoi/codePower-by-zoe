'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Classes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            currentStudent: {
                type: Sequelize.STRING
            },
            maxStudent: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            teacherId: {
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            speciality: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Classes');
    }
};