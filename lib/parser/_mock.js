const _ = require('lodash');
const BoiUtils = require('boi-utils');

// 合法的http请求method
const REG_VALID_METHOD = /^(get|post)\s+/i;
// 合法的路由pattern
const REG_VALID_PATTERN = /^(get|post|put|delete|head|options|connect|trace|patch)\s+(\/[\w\d]*)$/i;

/**
 * @private  
 * @param {Object} parser Paraer instance
 */
function Parse(parser) {
  parser.configuration.mock = parser.mockParser.pool.instances;
}
/**
 * @class 
 */
class MockApi {
  /**
   * @constructs MockApi 
   * @param {string} method http request method
   * @param {string} api    api path
   */
  constructor(method, api) {
    this.method = method;
    this.api = api;
    this.inParams = [];
    this.res = null;
    this.proxyApi = undefined;
    this.options = null;
  }
  /**
   * @method params config params to mock api
   * @param {Array|Object} params parameters list
   * @return MockApi instance
   */
  params(params) {
    if (_.isArray(params)) {
      this.inParams = params.map(item => {
        return {
          name: item,
          required: true
        };
      });
    } else if (_.isPlainObject(params)) {
      for (const key in params) {
        this.inParams.push(Object.assign({
          name: key
        }, params[key]));
      }
    }
    return this;
  }
  /**
   * @method custom customize configuration to mock api
   * @param {Object} options customize configuration
   * @return MockApi instance
   */
  custom(options) {
    if (!options || !_.isPlainObject(options)) {
      BoiUtils.log.error(`Invalid customize options for api:${this.api}`);
      process.exit(1);
    }
    this.options = options;
    return this;
  }
  /**
   * @method response config response to mock api
   * @param {Object} response response content
   */
  response(response) {
    if (!_.isPlainObject(response)) {
      BoiUtils.log.error(`Invalid response for api:${this.api}`);
      process.exit(1);
    }
    const {
      success: SuccessResponse,
      fail: FailResponse
    } = response;

    if (!_.isPlainObject(SuccessResponse) || !_.isPlainObject(FailResponse)) {
      BoiUtils.log.error(`Invalid response of api:${this.api}`);
      process.exit(1);
    }
    if (!SuccessResponse || !FailResponse) {
      BoiUtils.log.warn(`Api-${this.api}'s response is not complete`);
    }
    this.res = {
      success: SuccessResponse,
      fail: FailResponse
    };
  }
  /**
   * @method proxy set proxy to the mock api
   * @param {string} url referred url
   */
  proxy(url) {
    this.proxyApi = url;
  }
}

/**
 * @class ParserClass
 */
class ParserClass {
  /**
   * @constructs ParserClass parser class used for 'boi.mock' api
   */
  constructor() {
    this.pool = {
      apis: new Set(),
      instances: []
    };
  }
  /**
   * @method mock 
   * @param {string} pattern mock api pattern
   * @example Get /api
   */
  mock(pattern) {
    const Pattern = pattern && pattern.toLowerCase() || undefined;

    if (!Pattern || !REG_VALID_PATTERN.test(Pattern)) {
      BoiUtils.log.error(`Invalid mock pattern:${Pattern}`);
      process.exit(1);
    }

    if (!REG_VALID_METHOD.test(Pattern)) {
      BoiUtils.log.error('Unsupported HTTP Method');
      process.exit(1);
    }

    if (this.pool.apis.has(Pattern)) {
      BoiUtils.log.error(`Duplicated mock pattern:${Pattern}`);
      process.exit(1);
    }

    this.pool.apis.add(Pattern);

    const Result = REG_VALID_PATTERN.exec(Pattern);

    const MockInstance = new MockApi(Result[1], Result[2]);

    this.pool.instances.push(MockInstance);

    return MockInstance;
  }
}

/**
 * @module parser/mock
 * @param {Object} parser Parser instance
 */
module.exports = function (parser) {
  if (!new.target) {
    Parse(parser);
  } else {
    return new ParserClass();
  }
};