"use strict";
const { DataTypes, Model } = require('sequelize');

class Book extends Model {
  static associate(models) {
    Book.belongsToMany(models.Author, {
      through: models.BookAuthor,
    });
  }

  /**
  * Add book object
  * 
  * @param {object} book
  * @return savedBook book contents after saving
  */
  static async addBook({ title, ...book }) {
    let savedBook;
    try {
      const bookFound = await Book.findOne({
        where: {
          title,
        },
        raw: true,
      });
      if (bookFound) {
        await Book.update({
          ...book,
        }, {
          where: {
            title,
          },
        });
        savedBook = bookFound;
      } else {
        savedBook = await Book.create({ title, ...book });
      }
    } catch (e) {
      console.log('Error occured while adding book', e);
    }

    return savedBook;
  }
}
module.exports = sequelize => {
  Book.init({
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publicationDate: DataTypes.STRING,
    language: DataTypes.STRING,
    subjects: DataTypes.JSON,
    licenseRights: DataTypes.STRING,
  }, { sequelize, modelName: 'Book', paranoid: true });
  return Book;
};
