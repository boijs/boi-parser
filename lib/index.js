const Parser = require('./parser');
const Constants = require('./constants');

/**
 * @module boi/parser
 * @desc parser boi configuration
 * @param {String} pathname full path of boi-conf.js 
 * @param {Function} callback callback
 * @param {String} env environment variable
 * @param {Array} ignorePattern ignored pattern would return empty Object
 * @param {boolean} debug debug mode
 */
module.exports = function (pathname, callback, env, ignorePattern, debug) {
  // invalid callback
  if (!callback || typeof callback !== 'function') {
    throw new Error('Invalid callback for boi-parser');
  }

  // invalid pathname
  if (!pathname) {
    callback(new Error('Not find boi-conf.js'));
  }

  const ParserInstance = new Parser(env || Constants.DEFAULT_ENVS.testing, ignorePattern);

  // define parser instance as a global variable-boi
  Object.defineProperty(global, 'boi', {
    enumerable: true,
    writable: false,
    configurable: debug ? true : false,
    value: ParserInstance
  });

  new Promise(resolve => {
    // read config file
    resolve(require(pathname));
  }).then(() => {
    // parser
    return Parser.parse(ParserInstance);
  }).then(config => {
    if (!config) {
      throw 'Invalid configuration';
    }
    callback(null, config);
  }).catch(err => {
    callback(err);
  });
};