const path = require('path');
const readdir = require('readdir-enhanced');
const through2 = require('through2');

const extractMetaData = require('./src/features/metaDataExtractor');
const { storeBook } = require('./src/features/storeBook');

(function(){
 /**
  * Process all .rdf files
  * 
  * @param {string} filePath 
  */
  const processFilesMetaData = (
    filePath = path.join(__dirname, 'cache/epub')
  ) => readdir
    .stream(filePath, {
      deep: 2,
      filter: /.\.rdf/,
    })
    .pipe(
      through2.obj(async function (fileName, enc, next) {
        const book = await extractMetaData(filePath, fileName);
        await storeBook(book);
        next();
      })
    );

    processFilesMetaData();
})()
