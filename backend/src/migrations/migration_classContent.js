'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ClassContents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            classId: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            w1L: {
                type: Sequelize.STRING
            },
            w1C: {
                type: Sequelize.TEXT
            },
            w2L: {
                type: Sequelize.STRING
            },
            w2C: {
                type: Sequelize.TEXT
            },
            w3L: {
                type: Sequelize.STRING
            },
            w3C: {
                type: Sequelize.TEXT
            },
            w4L: {
                type: Sequelize.STRING
            },
            w4C: {
                type: Sequelize.TEXT
            },
            w5L: {
                type: Sequelize.STRING
            },
            w5C: {
                type: Sequelize.TEXT
            },
            w6L: {
                type: Sequelize.STRING
            },
            w6C: {
                type: Sequelize.TEXT
            },
            w7L: {
                type: Sequelize.STRING
            },
            w7C: {
                type: Sequelize.TEXT
            },
            w8L: {
                type: Sequelize.STRING
            },
            w8C: {
                type: Sequelize.TEXT
            },
            w9L: {
                type: Sequelize.STRING
            },
            w9C: {
                type: Sequelize.TEXT
            },
            w10L: {
                type: Sequelize.STRING
            },
            w10C: {
                type: Sequelize.TEXT
            },
            w11L: {
                type: Sequelize.STRING
            },
            w11C: {
                type: Sequelize.TEXT
            },
            w12L: {
                type: Sequelize.STRING
            },
            w12C: {
                type: Sequelize.TEXT
            },
            w1M: {
                type: Sequelize.TEXT
            },
            w2M: {
                type: Sequelize.TEXT
            },
            w3M: {
                type: Sequelize.TEXT
            },
            w4M: {
                type: Sequelize.TEXT
            },
            w5M: {
                type: Sequelize.TEXT
            },
            w6M: {
                type: Sequelize.TEXT
            },
            w7M: {
                type: Sequelize.TEXT
            },
            w8M: {
                type: Sequelize.TEXT
            },
            w9M: {
                type: Sequelize.TEXT
            },
            w10M: {
                type: Sequelize.TEXT
            },
            w11M: {
                type: Sequelize.TEXT
            },
            w12M: {
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
        await queryInterface.dropTable('ClassContents');
    }
};