const path = require('path');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(sinonChai);

const { assert, expect } = chai;

const root = path.resolve(__dirname);

module.exports = {
    root,
    assert,
    expect,
};
