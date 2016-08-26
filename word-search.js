"use strict"

const {createReadStream} = require("fs");
const readStream = createReadStream("/usr/share/dict/words")
const {Transform} = require('stream');
const transformStream = Transform();
const es = require('event-stream')
let [,, arg] = process.argv;


readStream  //connect streams together with `pipe`
  .pipe(es.split()) //split stream to break on newlines
  .pipe(es.map(function (line, cb) { //turn this async function into a stream
    let word = line.toString().toLowerCase()+"\n"
    if (word.startsWith(arg)) { 
      cb(null, word)   //render it nicely
    } else {
      // throw out data if it doesn't meet the criteria
      cb();
    } 
  }))
  .pipe(process.stdout)
  // .pipe(transformStream).pipe(process.stdout)              

















// highWaterMark changes the amount of characters in each chunk
// const readStream = createReadStream("/usr/share/dict/words", {highWaterMark: 10})


// readStream.on("data", buffer => {
//   readStream.pause();
//   process.stdout.write(buffer.toString())
//   // readStream.pipe(process.stdout)

// });
// // amount of time between each new character being put in stream
// const timer = setInterval(() => readStream.resume(), 0)

// readStream.on("end", () => {
//   clearInterval(timer)
// });


