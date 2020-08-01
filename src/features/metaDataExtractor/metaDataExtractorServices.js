"use strict";
const { map, flatten, get } = require('lodash');

/**
 * Extract author data from set of authors
 * @param {Array} authorsData 
 */
const extractAuthors = authorsData => {
  const mapAuthor = author => ({
    webPage: get(author, 'pgterms:webpage.$.rdf:resource', ''),
    deathDate: get(author, 'pgterms:deathdate._'),
    name: get(author, 'pgterms:name', ''),
    birthDate: get(author, 'pgterms:birthdate._'),
    alias: [].concat(get(author, 'pgterms:alias', [])),
  });

  const authors = map(get(authorsData, 'dcterms:creator'), authorDetail => {
    if (get(authorDetail, 'pgterms:agent') === undefined) {
      return mapAuthor(authorDetail);
    }
    return map(authorDetail, mapAuthor);
  });

  return flatten(authors);
};

/**
 * Extract id from text
 * @param {string} text 
 */
const extractId = text => /[^/]*$/.exec(text)[0];

/**
 * Extract properties from book object
 * 
 * @param {object} props 
 * @return book properties
 */
const extractProperties = props => {
  const book = get(props, 'rdf:RDF.pgterms:ebook');
  const bookTitle = get(book, 'dcterms:title');
  const title = (typeof bookTitle) === 'string' ? bookTitle.substring(0, 255): null;
  const authors = extractAuthors(book);
  const publisher = get(book, 'dcterms:publisher');
  const publicationDate = get(book, 'dcterms:issued._');
  const language = get(book, 'dcterms:language.rdf:Description.rdf:value._');
  const subjects = [].concat(
    map(get(book, 'dcterms:subject', []), (subject) =>
      get(subject, 'rdf:Description.rdf:value')
    )
  );
  const licenseRights = get(book, 'dcterms:rights');

  return {
    title,
    authors,
    publisher,
    publicationDate,
    language,
    subjects,
    licenseRights,
  };
};

module.exports = extractProperties;
