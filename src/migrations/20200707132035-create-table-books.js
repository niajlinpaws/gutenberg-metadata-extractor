"use strict";
const Sequelize = require('sequelize');
module.exports = {
    up: (queryInterface) => queryInterface.createTable('Books', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        publisher: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        publicationDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        language: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        subjects: {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: {},
        },
        licenseRights: {
            type: Sequelize.STRING,
            allowNull: true,
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
    }).then(() => queryInterface.addIndex('Books', ['publicationDate'])),
    down: (queryInterface) => queryInterface.dropTable('Books'),
};
