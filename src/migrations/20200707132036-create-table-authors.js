"use strict";
const Sequelize = require('sequelize');
module.exports = {
    up: (queryInterface) => queryInterface.createTable('Authors', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        deathDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        birthDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        alias: {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: {},
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        deletedAt: {
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface) => queryInterface.dropTable('Authors'),
};
