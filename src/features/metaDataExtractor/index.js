const path = require('path');
const fs = require('fs');

const {
  streamToText,
  rdfParser,
} = require('../../utils');
const extractProperties = require('./metaDataExtractorServices');

/**
 * Extract metadata from .rdf file 
 *
 * @param {string} filePath file path to process the file from
 * @param {string} fileName file name to process
 * 
 * @return {object} meta data for book 
 */
const extractMetaData = async (filePath, fileName) =>{
  const stream = fs.createReadStream(
    path.join(filePath, fileName),
    { encoding: 'utf-8' },
  );
  const file = await streamToText(stream);
  const bookContents = await rdfParser(file);
  const bookMetaData = extractProperties(bookContents)
  return bookMetaData;
}

module.exports = extractMetaData;
