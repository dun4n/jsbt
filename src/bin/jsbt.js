#!/usr/bin/env node

import path from 'path';

const repl = require(path.join(__dirname, '..', 'lib', 'bsrepl.js'));

repl();