const db = require('../../models');

const { Book, Author, BookAuthor } = db;

const addBook = async book => Book.addBook(book);
const addAuthors = async authors => Author.addAuthors(authors);
const addBookAuthors = async bookAuthorIds => await BookAuthor.addBookAuthors(bookAuthorIds);

/**
 * Store book to database 
 *
 * @param {object} book book to store
 */
const storeBook = async ({ authors, ...book }) => {
    const savedBook = await addBook(book); 
    const savedAuthors = await addAuthors(authors);
    const bookAuthorIds = savedAuthors.map(author => ({
        AuthorId: author.id,
        BookId: savedBook.id,
    }));
    await addBookAuthors(bookAuthorIds);
};

module.exports = {
  storeBook,
  addBook,
  addAuthors,
  addBookAuthors,
};
