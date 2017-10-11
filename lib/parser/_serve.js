const Constants = require('../constants');

/**
 * @module parser/serve
 * @param {Object} instance {@link Parser 解析器} instance
 */
module.exports = function (instance) {
  const Options = instance.configuration.serve;
  const Keys = Object.keys(Options);

  let conf = {};

  if (Keys.indexOf(Constants.DEFAULT_ENVS.development) === -1) {
    conf = Options;
  } else {
    Keys.forEach(key => {
      if (key === Constants.DEFAULT_ENVS.development) {
        conf = Object.assign({}, conf, Options[key]);
      } else if(!conf||conf[key] === undefined){
        conf = Object.assign({}, conf, {
          [key]: Options[key]
        });
      }
    });
  }

  instance.configuration.serve = Object.assign({}, Constants.DEFAULT_CONFIG.default.serve, conf);
};