/**
 * string1: "abb" -> string2: "ac"
 * 1. delete string1: "ab" -> "ac" (i-1, j)
 * 2. insert string1 and string2: "abbc" -> "ac" = "abb" -> "a" (i, j-1)
 * 3. replace string1: "abc" -> "ac" = "ab" -> "a" (i-1, j-1)
 * 
 * DP Solution:
 * T: O(m*n)
 * S: O(m*n) -> O(min(m, n))
 * Runtime: 88 ms
 */
/**
 * Given two words word1 and word2, find the minimum number of operations 
 * required to convert word1 to word2.
 * 
 * @param {string} word1 
 * @param {string} word2 
 */
var minDistance = function(word1, word2) {
    let m = word1.length;
    let n = word2.length;

    let stages = []; // m as stages, n as states
    for (let i = 0; i < m+1; i += 1) stages.push(new Array(n+1).fill(0));

    // stages[i][j] = minDistance(word1[:i+1], word2[:j+1]) [Include word1[i] and word2[j]]
    for (let i = 0; i < m+1; i += 1) {
      stages[i][0] = i;
    }

    for (let j = 0; j < n+1; j += 1) {
      stages[0][j] = j;
    }

    for (let i = 1; i < m+1; i += 1) {
      for (let j = 1; j < n+1; j += 1) {
        let delta = (word1[i-1] === word2[j-1]) ? 0: 1;
        stages[i][j] = Math.min(
          stages[i-1][j-1] + delta, // Replace
          stages[i-1][j] + 1, // Delete
          stages[i][j-1] + 1 // Insert
        );
      }
    }

    return stages[m][n];
};

let test2 = 'orange';
let test1 = 'apple';
console.log(minDistance(test1, test2)); // 5

/**
 * Leetcode Fundamental: 12/7 Update
 * 
 * Edit Distance >= ||word1| - |word2||
 * Hamming Distance: (only substute)
 * Edit Distance <= Hamming Distance
 * 
 * Recursive Solution:
 * 
 * word1: Ax
 * word2: By
 * 
 * edist(Ax, By) = min( edist(A, B) + delta(x, y), Replace
 *                      edist(Ax, B) + 1, Delete
 *                      edist(A, By) + 1 Insert
 *                    ) 
 * delta(x, y) = 0 if x = y, else 1
 * 
 * T: O( 3^min(len(word1), len(word2)) )
 * S: O(min(len(word1), len(word2))) , (depth of call stack)
 */
const edist = (word1, word2) => {
  let m = word1.length;
  let n = word2.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let delta = (word1 === word2) ? 0 : 1;

  return Math.min(
    edist(word1.slice(0, m), word2.slice(0, n)) + delta, // Replace
    edist(word1.slice(0, m), word2) + 1, // Delete
    edist(word1, word2.slice(0, n) + 1) // Insert
  );
}