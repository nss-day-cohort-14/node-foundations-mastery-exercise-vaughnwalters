"use strict"

const {createReadStream} = require("fs");
const readStream = createReadStream("/usr/share/dict/words")
// const {Transform} = require('stream');
// const transformStream = Transform();
const es = require('event-stream')
const transformStream = require("./limit-ten").transformStream
let [,, arg] = process.argv;

// this is where my transform function is
// console.log(transformStream.transformStream._transform());


// arg = /arg/i;
// arg = arg.ignoreCase;
// console.log("arg", arg);



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
  // .pipe(process.stdout)
  .pipe(transformStream).pipe(process.stdout)              

















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


