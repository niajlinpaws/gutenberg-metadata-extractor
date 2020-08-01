const xml2js = require('xml2js');

/**
 * Parse XML string to JS object
 * @param {string} file
 * @return object
 */
const parseRDFFile = async file => {
  let parsedFile;
  const parser = new xml2js.Parser({ explicitArray: false });
  try {
    parsedFile = await parser.parseStringPromise(file);
  } catch(e) {
    console.log('error during file parsing', err);
  }
  return parsedFile;
};

module.exports = parseRDFFile;
