"use strict";

const {Transform} = require('stream');
const limitTen = Transform()

let counter = 0;

limitTen._transform = (buffer, encoding, cb) => {
  if (counter < 10) {
    cb(null, buffer);
    counter++;
  } else {
    cb();
  }
}

module.exports = {limitTen}
