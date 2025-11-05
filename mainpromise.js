import fs from "fs/promises"

let a = await fs.readFile("papai.txt")
console.log(a.toString());

fs.appendFile('papai.txt', "\n\n\n\n\n\nohh yeah")

fs.writeFile("papai2.txt", "this is trying to overwrite")