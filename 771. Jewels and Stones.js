/**
You're given strings J representing the types of stones that are jewels, and 
S representing the stones you have.  Each character in S is a type of stone 
you have.  You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are 
letters. Letters are case sensitive, so "a" is considered a different type 
of stone from "A".
 */
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
const numJewelsInStones = function(J, S) {
  let set = new Set(J);
  let count = 0;
  
  for (let char of S) {
    if (set.has(char)) count += 1;
  }

  return count;
}

console.log(numJewelsInStones("aA", "aAAbbbb")); // 3
console.log(numJewelsInStones("z", "ZZ")); // 0
