/**
We are given two sentences A and B.  (A sentence is a string of space separated 
words.  Each word consists only of lowercase letters.)

A word is uncommon if it appears exactly once in one of the sentences, and does 
not appear in the other sentence.

Return a list of all uncommon words. 

You may return the list in any order.

Note:

1. 0 <= A.length <= 200
2. 0 <= B.length <= 200
3. A and B both contain only spaces and lowercase letters.
 */
/**
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
let uncommonFromSentences = function(A, B) {
  // Concat A and B then find the words in A+B that only shows once
  let sentence = (A + " " + B).split(" ");
  let map = {};
  let result = [];
  for (let word of sentence) {
    if (word in map) map[word] += 1;
    else map[word] = 1;
  }

  for (let key in map) {
    if (map[key] === 1) result.push(key);
  }

  return result;
};

console.log(uncommonFromSentences("this apple is sweet", "this apple is sour")); // ["sweet","sour"]
console.log(uncommonFromSentences("apple apple", "banana")); // ["banana"]