'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pleasantProgress = require('pleasant-progress');

var _pleasantProgress2 = _interopRequireDefault(_pleasantProgress);

var levels = ['verbose', 'debug', 'info', 'warn', 'error'];

var utils = module.exports = {};

utils.random = {
  int: function int() {
    var max = arguments[0] === undefined ? 1 : arguments[0];

    return Math.round(Math.random() * (max - 1));
  },
  string: function string() {
    return Math.random().toString(36).substr(2);
  },
  shuffle: function shuffle() {
    var arr = arguments[0] === undefined ? [] : arguments[0];

    return arr.sort(function () {
      return Math.random() - 0.5;
    });
  }
};

utils.format = function (msg) {
  var lvl = levels[utils.random.int(levels.length)];

  return msg.split('\n').map(function (str) {
    return '[' + lvl + '] ' + str;
  }).join('\n');
};

utils.timer = function (cb) {
  var progress = new _pleasantProgress2['default']();
  progress.start('');

  var timer = setInterval(function () {
    progress.stop();

    clearInterval(timer);

    cb();
  }, utils.random.int(5) * 1000);
};

utils.readdir = function (root) {
  var files = arguments[1] === undefined ? [] : arguments[1];
  var prefix = arguments[2] === undefined ? '' : arguments[2];

  var dir = _path2['default'].join(root, prefix);

  if (!_fs2['default'].existsSync(dir)) return files;

  if (_fs2['default'].statSync(dir).isDirectory()) {
    _fs2['default'].readdirSync(dir).filter(function (name) {
      return name[0] !== '.' && name.indexOf('node_modules') === -1;
    }).forEach(function (name) {
      utils.readdir(root, files, _path2['default'].join(prefix, name));
    });
  } else {
    files.push(prefix);
  }

  return files;
};