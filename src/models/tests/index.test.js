const proxyquire = require('proxyquire');
const {
  sequelize,
  Sequelize,
} = require('sequelize-test-helpers');
const db = require('../index');
const { testSetup: { assert, expect } } = require('../../utils');
 
const { DataTypes } = Sequelize;

const BookFactory = proxyquire('../Book', {
  sequelize: Sequelize,
});
const AuthorFactory = proxyquire('../Author', {
  sequelize: Sequelize,
});

let Book;
let Author;
before(async () => {
  await db.sequelize.sync();
  Book = BookFactory(sequelize);
  Author = AuthorFactory(sequelize);
});

describe('models/index', () => {
 
  it('should setup models', () => {
    assert.isOk(db.Author);
    assert.isOk(db.Book);
  });

  it('called Book.init with the correct parameters', () => {
    
    expect(Book.init).to.have.been.calledWith(
      {
        title: DataTypes.STRING,
        publisher: DataTypes.STRING,
        publicationDate: DataTypes.STRING,
        language: DataTypes.STRING,
        subjects: DataTypes.JSON,
        licenseRights: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Book',
        paranoid: true,
      }
    )
  });

  it('called Author.init with the correct parameters', () => {
    
    expect(Author.init).to.have.been.calledWith(
      {
        name: DataTypes.STRING,
        birthDate: DataTypes.STRING,
        deathDate: DataTypes.STRING,
        alias: DataTypes.JSON,
      },
      {
        sequelize,
        modelName: 'Author',
        paranoid: true,
      }
    )
  });
});

after(async () => {
  Book.init.resetHistory();
  Author.init.resetHistory();
  await db.sequelize.close();
});
