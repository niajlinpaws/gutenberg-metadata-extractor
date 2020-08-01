const fs = require('fs');
const path = require('path');
const mock = require('mock-fs');
const { testSetup: { root, assert } } = require("../index");
const streamToText = require("../streamToText");
const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

describe("utiilt functions", () => {

  it("should stream to text", () => {
    before(() => {
      mock({
        [path.join(root, '/test-file')]: dummyText
      });
    });

    it('should return full text', async () => {
      const file = fs.createReadStream(path.join(root, 'test-file'));
      assert.strictEqual(await streamToText(file), dummyText);
    });

    after(() => {
      mock.restore();
    });
  });
});
