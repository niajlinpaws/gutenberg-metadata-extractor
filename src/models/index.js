"use strict";

const Sequelize = require('sequelize');
const Book = require('./Book');
const Author = require('./Author');
const BookAuthor = require('./BookAuthor');
const database = process.env.NODE_ENV || 'development';
const config = require('../config/database')[database];
/* eslint-disable no-console */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config,
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}
sequelize
  .authenticate()
  .then(() => console.log('Connection to database succesfull'))
  .catch(err => console.log('Error connecting to database: ', err));
/* eslint-enable no-console */
const db = {
  sequelize,
  Sequelize: Sequelize.Sequelize,
  Book: Book(sequelize),
  Author: Author(sequelize),
  BookAuthor: BookAuthor(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
