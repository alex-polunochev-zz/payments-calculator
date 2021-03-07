const path = require('path');

module.exports = {
  // https://jestjs.io/docs/en/webpack#mocking-css-modules
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
