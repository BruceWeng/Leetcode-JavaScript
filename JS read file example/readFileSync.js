const fs = require('fs');
let words = fs.readFileSync(process.argv[2], 'utf8').toString();
words = words.split('\n');
console.log(words);