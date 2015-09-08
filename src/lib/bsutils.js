'use strict';

import fs from 'fs';
import path from 'path';

import Progress from 'pleasant-progress';

const levels = ['verbose', 'debug', 'info', 'warn', 'error'];

let utils = module.exports = {};

utils.random = {
  int(max = 1) {
    return Math.round(Math.random() * (max - 1));
  },
  string() {
    return Math.random().toString(36).substr(2);
  },
  shuffle(arr = []) {
    return arr.sort(function() {
      return Math.random() - 0.5;
    });
  }
}

utils.format = function(msg) {
  let lvl = levels[utils.random.int(levels.length)];

  return msg.split('\n').map(function(str) {
    return `[${lvl}] ${str}`;
  }).join('\n');
};

utils.timer = function(cb) {
  let progress = new Progress();
  progress.start('');

  let timer = setInterval(function() {
    progress.stop();

    clearInterval(timer);

    cb();

  }, utils.random.int(5) * 1000);
};

utils.readdir = function(root, files = [], prefix = '') {
  let dir = path.join(root, prefix);

  if(!fs.existsSync(dir))
    return files;

  if(fs.statSync(dir).isDirectory()) {
    fs.readdirSync(dir)
      .filter(name => name[0] !== '.' && name.indexOf('node_modules') === -1)
      .forEach(function (name) {
        utils.readdir(root, files, path.join(prefix, name))
      });      
  } else {
    files.push(prefix);
  }

  return files
};
