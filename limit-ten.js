"use strict";

const {Transform} = require('stream');
const transformStream = Transform()

let counter = 0;

transformStream._transform = (buffer, encoding, cb) => {
  if (counter < 10) {
    cb(null, buffer);
    counter++;
  } else {
    cb();
  }
}

module.exports = {transformStream}
