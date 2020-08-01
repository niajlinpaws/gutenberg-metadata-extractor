"use strict";
const { DataTypes, Model } = require('sequelize');
class Author extends Model {
  static associate(models) {
    Author.belongsToMany(models.Book, {
      through: models.BookAuthor,
    });
  }

  /**
  * Add author object
  * 
  * @param {[object]} authors
  * @return savedAuthor author contents after saving
  */
  static async addAuthors(authors) {
    let savedAuthors;
    try {
      savedAuthors = await Promise.all(authors.map(async ({ name, ...author }) => {
        const authorFound = await Author.findOne({
          where: {
            name,
          },
          raw: true,
        });

        if (authorFound) {
          await Author.update({
            ...author,
          }, {
            where: {
              name,
            },
          });
          return authorFound;
        } else {
          const authorData = await Author.create({ name, ...author });
          return authorData;
        }
      }));
    } catch (e) {
      console.log('Error occured while adding authors', e);
    }
    return savedAuthors;
  }
}
module.exports = sequelize => {
  Author.init({
    name: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    deathDate: DataTypes.STRING,
    alias: DataTypes.JSON,
  }, { sequelize, paranoid: true, modelName: 'Author' });
  return Author;
};
