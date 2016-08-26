const {createReadStream, writeFile} = require("fs");
// highWaterMark changes the amount of characters in each chunk
// const readStream = createReadStream("/usr/share/dict/words", {highWaterMark: 10})
const readStream = createReadStream("/usr/share/dict/words")
let [,, arg] = process.argv
// arg = arg.toString();
// console.log("readStream", readStream);




readStream.on("data", buffer => {
  readStream.pause();
  process.stdout.write(buffer.toString())
  // readStream.pipe(process.stdout)

});
// amount of time between each new character being put in stream
const timer = setInterval(() => readStream.resume(), 0)

readStream.on("end", () => {
  clearInterval(timer)
});


