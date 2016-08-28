"use strict"

const {createReadStream} = require("fs");
const readStream = createReadStream("/usr/share/dict/words")
const es = require('event-stream')
const transformStream = require("./limit-ten").transformStream
let [,, arg] = process.argv;


// searchterm undefined
if (arg === undefined) {
  process.stdout.write("Usage: wordsearch.js [searchterm]\n")
}
else{
  arg = arg.toLowerCase()
  readStream
  //connect streams together with `pipe`
  //split stream to break on newlines
  .pipe(es.split())
  .pipe(es.map(function (line, cb) {
//turn this async function into a stream
    let word = line.toString()+"\n"
    let wordLower = line.toString().toLowerCase()+"\n"
    if (wordLower.startsWith(arg)) { 
      cb(null, word)
    } else {
// throw out data if it doesn't meet the criteria
      cb();
    } 
  }))
  .pipe(transformStream).pipe(process.stdout)          
}


















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


