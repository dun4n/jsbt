'use strict';

import repl from 'repl';
import fs from 'fs';
import {spawn} from 'child_process';

import async from 'async';
import Progress from 'pleasant-progress';

import utils from './bsutils.js';

let stdioCb = function(buff) {
  process.stdout.write(utils.format(buff.toString()));
};

let buildTimerCb = function(input, callback) {
  return function() {
    let child = spawn('npm', [input.trim()], {stdio: 'pipe'});

    child.on('close', function() {
      callback(null, 'At the end of the day...');
    });

    child.stdout.on('data', stdioCb);
    child.stderr.on('data', stdioCb);
  }
};

let clean = function(input) {
  if (input[0] === '(' && input[input.length - 1] === ')') {
    input = input.slice(1, -2); // remove "(" and ")"
  }

  return input.trim();
};

function replEval(input, context, filename, cb) {

  input = clean(input);

  if(!input)
    return cb();

  let files = utils.random.shuffle(utils.readdir('.'));

  async.eachSeries(files, function(file, callback) {
    utils.timer(function() {
      stdioCb(fs.readFileSync(file));
      callback();
    });
  }, function(err) {
    utils.timer(buildTimerCb(input, cb))
  });
}

export default function() {
  repl.start({
    prompt: '> ',
    input: process.stdin,
    output: process.stdout,
    eval: replEval,
    useGlobal: true
  });
};