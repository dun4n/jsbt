'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _repl = require('repl');

var _repl2 = _interopRequireDefault(_repl);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _pleasantProgress = require('pleasant-progress');

var _pleasantProgress2 = _interopRequireDefault(_pleasantProgress);

var _bsutilsJs = require('./bsutils.js');

var _bsutilsJs2 = _interopRequireDefault(_bsutilsJs);

var stdioCb = function stdioCb(buff) {
  process.stdout.write(_bsutilsJs2['default'].format(buff.toString()));
};

var buildTimerCb = function buildTimerCb(input, callback) {
  return function () {
    var child = (0, _child_process.spawn)('npm', [input.trim()], { stdio: 'pipe' });

    child.on('close', function () {
      callback(null, 'At the end of the day...');
    });

    child.stdout.on('data', stdioCb);
    child.stderr.on('data', stdioCb);
  };
};

var clean = function clean(input) {
  if (input[0] === '(' && input[input.length - 1] === ')') {
    input = input.slice(1, -2); // remove "(" and ")"
  }

  return input.trim();
};

function replEval(input, context, filename, cb) {

  input = clean(input);

  if (!input) return cb();

  var files = _bsutilsJs2['default'].random.shuffle(_bsutilsJs2['default'].readdir('.'));

  _async2['default'].eachSeries(files, function (file, callback) {
    _bsutilsJs2['default'].timer(function () {
      stdioCb(_fs2['default'].readFileSync(file));
      callback();
    });
  }, function (err) {
    _bsutilsJs2['default'].timer(buildTimerCb(input, cb));
  });
}

exports['default'] = function () {
  _repl2['default'].start({
    prompt: '> ',
    input: process.stdin,
    output: process.stdout,
    eval: replEval,
    useGlobal: true
  });
};

;
module.exports = exports['default'];