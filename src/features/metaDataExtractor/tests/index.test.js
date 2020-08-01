const { testSetup: { assert } } = require("../../../utils");
const extractProperties = require("../metaDataExtractorServices");
const bookMetaData = require("../mocks/bookMetaData");

describe("extractProperties", () => {

  it("should extract all book fields", () => {
    const actual = extractProperties(bookMetaData);
    const expected = {
      title: "The Declaration of Independence of the United States of America",
      authors: [
        {
          alias: ["United States President (1801-1809)"],
          birthDate: "1743",
          deathDate: "1826",
          name: "Jefferson, Thomas",
          webPage: "http://en.wikipedia.org/wiki/Thomas_Jefferson",
        },
      ],
      publisher: "Project Gutenberg",
      publicationDate: "1971-12-01",
      language: "en",
      subjects: [
        "United States. Declaration of Independence",
        "United States -- History -- Revolution, 1775-1783 -- Sources",
        "E201",
        "JK",
      ],
      licenseRights: "Public domain in the USA.",
    };
    assert.deepEqual(actual, expected);
  });
});
