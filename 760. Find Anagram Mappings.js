/**
Given two lists Aand B, and B is an anagram of A. B is an anagram of A means B 
is made by randomizing the order of the elements in A.

We want to find an index mapping P, from A to B. A mapping P[i] = j means the 
ith element in A appears in B at index j.

These lists A and B may contain duplicates. If there are multiple answers, 
output any of them.

Note:

A, B have equal lengths in range [1, 100].
A[i], B[i] are integers in range [0, 10^5].
 */
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
let anagramMappings = function(A, B) {
  let map = {}; // key: num in B, value: [indices]
  let result = [];
  for (let i = 0; i < B.length; i += 1) {
    if (B[i] in map) map[B[i]].push(i);
    else map[B[i]] = [i];
  }

  for (let i = 0; i < A.length; i += 1) {
    result.push(map[A[i]][0]);
    map[A[i]].shift();
  }
  
  return result;
};

console.log(anagramMappings([12, 28, 46, 32, 50], [50, 12, 32, 46, 28])); // [1, 4, 3, 2, 0]
/**
 * as P[0] = 1 because the 0th element of A appears at B[1], and P[1] = 4 
 * because the 1st element of A appears at B[4], and so on.
 */