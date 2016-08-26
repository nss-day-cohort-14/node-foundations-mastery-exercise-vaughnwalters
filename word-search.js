const {createReadStream} = require("fs");
const readStream = createReadStream("/usr/share/dict/words")
const {Transform} = require('stream');
const transformStream = Transform();
let [,, arg] = process.argv;
var es = require('event-stream')

// arg = arg.toString();
// console.log("readStream", readStream);

// console.log("es", es.map);



// // // readStream.pipe(process.stdout)
// // // when i get transform stream
// readStream.pipe(transformStream).pipe(process.stdout);





// using event-stream, but no line breaks

 readStream  //connect streams together with `pipe`
    .pipe(es.split()) //split stream to break on newlines
    .pipe(es.map(function (line, cb) { //turn this async function into a stream
      cb(null, line.toString().toLowerCase()+"\n")   //render it nicely
    }))
    .pipe(process.stdout)              // pipe it to stdout !
// }


// transformStream._transform = (buffer, encoding, cb) => {
//   cb(null, buffer.toString().toLowerCase())
// }














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


