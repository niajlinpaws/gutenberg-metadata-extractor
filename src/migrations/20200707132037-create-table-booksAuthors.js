"use strict";
const Sequelize = require('sequelize');
module.exports = {
    up: (queryInterface) => queryInterface.createTable('BooksAuthors', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        BookId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Books',
                key: 'id',
            },
        },
        AuthorId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Authors',
                key: 'id',
            },
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
    down: (queryInterface) => queryInterface.dropTable('BooksAuthors'),
};
