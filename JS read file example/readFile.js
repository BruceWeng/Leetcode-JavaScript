'use strict';
let fs = require('fs');
fs.readFile(process.argv[2], function(error, data) {
  console.log('Finish reading the file!');

  data = data.toString();
  console.log(data);

  let arrayByLine = data.split('\n');

  let lines = arrayByLine.length;

  let arrayBySpace = data.split(' ');

  let arrayByWord = [];

  for (let i = 0; i < lines; i++) {
    let words = arrayByLine[i].split(' ');
    for (let j = 0; j < words.length; j++) {
      arrayByWord.push(words[j]);
    }
  }

  console.log('lines: ' + lines);
  console.log('arrayByLine:');
  console.log(arrayByLine);
  console.log('arrayBySpace');
  console.log(arrayBySpace);
  console.log('arrayByWord');
  console.log(arrayByWord);
})
