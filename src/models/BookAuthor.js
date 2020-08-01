"use strict";
const { Model, DataTypes } = require('sequelize');
class BookAuthor extends Model {
  static associate(models) {
    BookAuthor.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'book',
    });
    BookAuthor.belongsTo(models.Author, {
      foreignKey: 'authorId',
      as: 'author',
    });
  }
  /**
  * Add bookAuthors object
  * 
  * @param {[object]} bookAuthors
  * @return savedBookAuthor contents after saving
  */
  static async addBookAuthors(bookAuthors) {
    let savedBookAuthors;
    try {
      savedBookAuthors = await BookAuthor.bulkCreate(bookAuthors);
    } catch (e) {
      console.log('Error occured while adding book authors', e);
    }
    return savedBookAuthors;
  }
}
// exports.BookAuthor = BookAuthor;
module.exports = sequelize => {
  BookAuthor.init({
    BookId: DataTypes.INTEGER,
    AuthorId: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'BookAuthor',
    tableName: 'BooksAuthors',
  });
  return BookAuthor;
};
