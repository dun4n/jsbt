#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var repl = require(_path2['default'].join(__dirname, '..', 'lib', 'bsrepl.js'));

repl();