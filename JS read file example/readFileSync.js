const fs = require('fs');
let words = fs.readFileSync(process.argv[2]).toString();
words = words.split('\n');
console.log(words);