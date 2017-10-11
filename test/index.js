const _ = require('lodash');
const Path = require('path');
const Parser = require('../lib/index.js');

describe('Test cases for <env>', function () {
  afterEach(function(){
    Object.defineProperty(global, 'boi', {
      enumerable: true,
      configurable: true,
      value: null
    });
  });
  it('Self defined env should be available', function (done) {
    Parser(Path.join(__dirname, './_conf.js'), (err, configuration) => {
      if (err) {
        done(err);
      }
      if (configuration.compile.js.splitCommonModule) {
        done();
      } else {
        done(new Error());
      }
    }, 'grey', ['mock','serve','deploy'], true);
  });
});

describe('Test cases for <ignorePattern>', function () {
  afterEach(function(){
    Object.defineProperty(global, 'boi', {
      enumerable: true,
      configurable: true,
      value: null
    });
  });
  it('Compile action should not parser mock&serve configuration', function (done) {
    Parser(Path.join(__dirname, './_conf.js'), (err, configuration) => {
      if (err) {
        done(err);
      }
      if (_.isEmpty(configuration.serve) && _.isEmpty(configuration.plugins)) {
        done();
      } else {
        done(new Error());
      }
    }, 'testing', ['mock', 'serve'], true);
  });
  it('Dev server without mock should not parser mock&deploy configuration', function (done) {
    Parser(Path.join(__dirname, './_conf.js'), (err, configuration) => {
      if (err) {
        done(err);
      }
      if (_.isEmpty(configuration.deploy) && _.isEmpty(configuration.plugins)) {
        done();
      } else {
        done(new Error());
      }
    }, 'testing', ['mock', 'deploy'], true);
  });
  it('Dev server with mock should not parser deploy configuration', function (done) {
    Parser(Path.join(__dirname, './_conf.js'), (err, configuration) => {
      if (err) {
        done(err);
      }
      if (_.isEmpty(configuration.deploy)) {
        done();
      } else {
        done(new Error());
      }
    }, 'testing', ['deploy'], true);
  });
  it('Deploy action should only parser deploy configuration', function (done) {
    Parser(Path.join(__dirname, './_conf.js'), (err, configuration) => {
      if (err) {
        done(err);
      }
      if (_.isEmpty(configuration.compile) && _.isEmpty(configuration.serve) && _.isEmpty(configuration.mock) && _.isEmpty(configuration.plugins)) {
        done();
      } else {
        done(new Error());
      }
    }, 'testing', ['compile', 'serve', 'plugins', 'mock'], true);
  });

  it('Mock server should only parser mock configuration', function (done) {
    Parser(Path.join(__dirname, './_conf.js'), (err, configuration) => {
      if (err) {
        done(err);
      }
      if (_.isEmpty(configuration.compile) && _.isEmpty(configuration.serve) && _.isEmpty(configuration.deploy) && _.isEmpty(configuration.plugins)) {
        done();
      } else {
        done(new Error());
      }
    }, 'testing', ['compile', 'serve', 'plugins', 'deploy'], true);
  });
});