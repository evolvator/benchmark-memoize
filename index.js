var Benchmark = require('benchmark');
var tb = require('travis-benchmark');
var async = require('async');
var _ = require('lodash');

var memoizeOne = require('memoize-one');
var lruMemoize = require('lru-memoize').default;
var fastMemoize = require('fast-memoize');
var memoizee = require('memoizee');
var memoizeWeak = require('memoize-weak');
var memoizerific = require('memoizerific');
var microMemoize = require('micro-memoize').default;
var moize = require('moize').default;

function objectFunction(config) {
  return config.a * config.b;
};

async.series([
  (next) => {
    var suite = new Benchmark.Suite(`memoize new`);
    
    (() => {
      suite.add({
        name: 'lodash@4.17.10 memoize',
        fn: function() {
          _.memoize(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'memoize-one@4.0.0',
        fn: function() {
          memoizeOne(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'lru-memoize@1.0.2',
        fn: function() {
          lruMemoize()(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'fast-memoize@2.5.1',
        fn: function() {
          fastMemoize(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'memoizee@0.4.12',
        fn: function() {
          memoizee(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'memoize-weak@1.0.2',
        fn: function() {
          memoizeWeak(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'memoizerific@1.11.3',
        fn: function() {
          memoizerific(1)(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'micro-memoize@2.0.3',
        fn: function() {
          microMemoize(objectFunction);
        }
      });
    })();
    
    (() => {
      suite.add({
        name: 'moize@5.3.1',
        fn: function() {
          moize(objectFunction);
        }
      });
    })();

    tb.wrapSuite(suite, () => next());
    suite.run({ async: true });
  },
  (next) => {
    var suite = new Benchmark.Suite(`memoize set by single object argument`);
    
    (() => {
      var memoized = _.memoize(objectFunction);
      suite.add({
        name: 'lodash@4.17.10 memoize',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizeOne(objectFunction);
      suite.add({
        name: 'memoize-one@4.0.0',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = lruMemoize()(objectFunction);
      suite.add({
        name: 'lru-memoize@1.0.2',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = fastMemoize(objectFunction);
      suite.add({
        name: 'fast-memoize@2.5.1',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizee(objectFunction);
      suite.add({
        name: 'memoizee@0.4.12',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizeWeak(objectFunction);
      suite.add({
        name: 'memoize-weak@1.0.2',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizerific(1)(objectFunction);
      suite.add({
        name: 'memoizerific@1.11.3',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = microMemoize(objectFunction);
      suite.add({
        name: 'micro-memoize@2.0.3',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = moize(objectFunction);
      suite.add({
        name: 'moize@5.3.1',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();

    tb.wrapSuite(suite, () => next());
    suite.run({ async: true });
  },
  (next) => {
    var suite = new Benchmark.Suite(`memoize get by single object argument`);
    
    (() => {
      var memoized = _.memoize(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'lodash@4.17.10 memoize',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizeOne(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'memoize-one@4.0.0',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = lruMemoize()(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'lru-memoize@1.0.2',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = fastMemoize(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'fast-memoize@2.5.1',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizee(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'memoizee@0.4.12',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizeWeak(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'memoize-weak@1.0.2',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = memoizerific(1)(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'memoizerific@1.11.3',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = microMemoize(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'micro-memoize@2.0.3',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();
    
    (() => {
      var memoized = moize(objectFunction);
      memoized({ a: 3, b: 7 });
      suite.add({
        name: 'moize@5.3.1',
        fn: function() {
          memoized({ a: 3, b: 7 });
        }
      });
    })();

    tb.wrapSuite(suite, () => next());
    suite.run({ async: true });
  }
]);