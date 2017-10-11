const Constants = require('../constants');

/**
 * @module parser/compile
 * @param {Object} instance {@link Parser 解析器} instance
 */
module.exports = function (instance) {
  for (const pattern in instance.configuration.compile) {
    const Options = instance.configuration.compile[pattern];
    const Keys = Object.keys(Options);

    if (Keys.indexOf(instance.env) === -1) {
      instance.configuration.compile[pattern] = Object.assign({}, Constants.DEFAULT_CONFIG.default[pattern], Options);
      continue;
    }
    let conf = null;
    Keys.forEach(key => {
      if (key === instance.env) {
        conf = Object.assign({}, conf, Options[key]);
      } else if(!conf||conf[key] === undefined){
        conf = Object.assign({}, conf, {
          [key]: Options[key]
        });
      }
    });
    instance.configuration.compile[pattern] = Object.assign({}, Constants.DEFAULT_CONFIG.default[pattern], conf);
  }
};