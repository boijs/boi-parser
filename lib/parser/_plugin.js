/**
 * @module parser/plugins
 * @param {Object} instance {@link Parser 解析器} instance
 */
module.exports = function (instance) {
  if (instance.configuration.plugins.size === 0) {
    return;
  }

  for (const plugin of instance.configuration.plugins.entries()) {
    const [PluginName, Options] = plugin;

    const Keys = Object.keys(Options);

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
    instance.configuration.plugins.set(PluginName, conf);
  }
};