## Gutenberg Metadata Extractor

This project extracts metadata & persists the data to DB from the source provided below:
(https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip)
into `cache/` directory to be used for processing & querying

### Major technologies used:
- Node.js
- MySQL
- sequelize (ORM)
- sequelize-cli (migrations)
- mocha (test suite)
- chai (assertion)
- sinon (test stubs/mocks)
- sequelize-test-helpers (for model/schema testing)
- nyc (coverage report)
- xml2js (for .rdf file processing)

### Steps to setup the project:

Install project and development dependencies from `package.json` using:
```
npm i
```

Run the MySQL database, using docker or any local/cloud based instance:
```
docker run -e MYSQL_ROOT_PASSWORD=root -it -p 3306:3306 mysql:8.0
```

Run the project:
```
npm start
```

### Generate Test Coverage Reports

Test coverage report
```
npm run coverage
```

Run tests without coverage
```
npm run test
```