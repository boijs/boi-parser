const _             = require('lodash');
const Constants     = require('../constants');
const CompileParser = require('./_compile.js');
const ServeParser   = require('./_serve.js');
const MockParser    = require('./_mock.js');
const DeployParser  = require('./_deploy.js');
const PluginParser  = require('./_plugin.js');
const BoiUtils      = require('boi-utils');


const REG_VALID_CONFIG_PATTERN = new RegExp(`^(${Constants.DEFAULT_CONFIG.patterns.join('|')})$`);
const REG_VALID_PLUGIN_NAME = /^boi\-plugin/;
/**
 * @class parser class
 */
class Parser {
  /**
   * @constructs
   * @param {string} env environment variable
   * @param {Array|null} ignorePatterns patterns that need to be parsed
   */
  constructor(env, ignorePatterns) {
    // avaliable environment variables
    this.avalibleEnvs = new Set(_.values(Constants.DEFAULT_ENVS));
    // configuration
    this.configuration = {
      compile: {},
      serve: {},
      mock: {},
      deploy: {},
      plugins: new Map()
    };
    // current environment variable
    this.env = env || 'testing';
    // mock praser
    this.mockParser = new MockParser();

    this.ignorePatterns = _.isEmpty(ignorePatterns) ? null : new RegExp(ignorePatterns.join('|'), 'i');
  }
  /**
   * @static
   * @desc parse instance's configuration
   * @param {Parser} instance Parser instance
   * @return {Object} parsered configuration 
   */
  static parse(instance) {
    if (!instance.ignorePatterns || !instance.ignorePatterns.test('compile')) {
      CompileParser(instance);
    }
    if (!instance.ignorePatterns || !instance.ignorePatterns.test('plugins')) {
      PluginParser(instance);
    }
    if (!instance.ignorePatterns || !instance.ignorePatterns.test('mock')) {
      MockParser(instance);
    }
    if (!instance.ignorePatterns || !instance.ignorePatterns.test('serve')) {
      ServeParser(instance);
    }
    if (!instance.ignorePatterns || !instance.ignorePatterns.test('deploy')) {
      DeployParser(instance);
    }
    return instance.configuration;
  }
  /**
   * @static
   * @desc 配置汇总
   * @param {string} feature include compile/serve/deploy
   * @param {Object} obj 
   * @param {string} obj.pattern child pattern
   * @param {Object} obj.options config detail
   */
  static config(feature, {
    pattern,
    options
  }) {
    if (pattern && (!REG_VALID_CONFIG_PATTERN.test(pattern) || !_.isPlainObject(options))) {
      throw new Error(`Invalid configuration pattern: ${pattern}`);
    }
    // skip if the pattern is ignored
    if (this.ignorePatterns && this.ignorePatterns.test(feature)) {
      return;
    }
    if (pattern) {
      this.configuration[feature][pattern] = options;
    } else {
      this.configuration[feature] = options;
    }
  }
  /**
   * @public
   * @desc expand environment variable
   * @param {Array} envs environment variable list
   */
  envs(envs) {
    if (!envs || !_.isArray(envs)) {
      throw new Error('Invalid envionment variables');
    }
    this.avalibleEnvs = new Set(_.values(Constants.DEFAULT_ENVS).concat(envs));
  }
  /**
   * @public
   * @desc api for config compile patterns
   * @param {String} pattern compile child pattern
   * @param {Object} options config detail
   */
  spec(pattern, options) {
    Parser.config.call(this, 'compile', {
      pattern,
      options
    });
  }
  /**
   * @public
   * @desc api for config dev server
   * @param {Object} options config detail
   */
  serve(options) {
    Parser.config.call(this, 'serve', {
      options
    });
  }
  /**
   * @public
   * @desc api for config mock
   * @param {string} pattern mock api pattern
   * @example Get /test
   */
  mock(pattern) {
    return this.mockParser.mock(pattern);
  }
  /**
   * @public
   * @desc api for config deploy feature
   * @param {Object} options config detail
   */
  deploy(options) {
    Parser.config.call(this, 'deploy', {
      options
    });
  }
  /**
   * @public
   * @desc api for use plugin
   */
  use(name, options) {
    if (!this.ignorePatterns || !this.ignorePatterns.test('plugins')) {
      if (!name || !REG_VALID_PLUGIN_NAME.test(name)) {
        BoiUtils.log.error(`Invalid plugin: ${name}`);
        process.exit(1);
      }
      this.configuration.plugins.set(name, options||{});
    }
  }
}

/**
 * @module parser
 */
module.exports = Parser;