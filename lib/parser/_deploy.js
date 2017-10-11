/**
 * @module parser/deploy
 * @param {Object} instance {@link Parser 解析器} instance
 */
module.exports = function (instance) {
  const Options = instance.configuration.deploy;
  const REG_VALID_KEYS = new RegExp(`^(${instance.env}|cdn|connect)$`, 'i');
  const Keys = Object.keys(Options).filter(key => {
    return REG_VALID_KEYS.test(key);
  });

  let conf = {};

  if (Keys.indexOf(instance.env) === -1) {
    conf = Options;
  } else {
    Keys.forEach(key => {
      if (key === instance.env) {
        conf = Object.assign({}, conf, Options[key]);
      } else if(!conf||conf[key] === undefined){
        conf = Object.assign({}, conf, {
          [key]: Options[key]
        });
      }
    });
  }

  instance.configuration.deploy = conf;
};