/**
 * string1: "abb" -> string2: "ac"
 * 1. delete string1: "ab" -> "ac" (i-1, j)
 * 2. insert string1 aka delete string2: "abbc" -> "ac" = "abb" -> "a" (i, j-1)
 * 3. replace string1: "abc" -> "ac" = "ab" -> "a" (i-1, j-1)
 * 
 * Pattern:
 * 1. current char matech (replace string): dp[i][j] = dp[i-1][j-1]
 * 2. delete current char: find previous char state:
 *      a. delete char at string1: dp[i][j] = dp[i-1][j]
 *      b. delete chat at string2: dp[i][j] = dp[i][j-1]
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
var minDistance = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;

  let stages = []; // m as stages, n as states
  for (let i = 0; i < m + 1; i += 1) stages.push(new Array(n + 1).fill(0));

  // stages[i][j] = minDistance(word1[:i+1], word2[:j+1]) [Include word1[i] and word2[j]]
  for (let i = 0; i < m + 1; i += 1) {
    stages[i][0] = i;
  }

  for (let j = 0; j < n + 1; j += 1) {
    stages[0][j] = j;
  }

  for (let i = 1; i < m + 1; i += 1) {
    for (let j = 1; j < n + 1; j += 1) {
      let delta = (word1[i - 1] === word2[j - 1]) ? 0 : 1;
      stages[i][j] = Math.min(
        stages[i - 1][j - 1] + delta, // Replace
        stages[i - 1][j] + 1, // Delete
        stages[i][j - 1] + 1 // Insert
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

/**
 * DP Solution 12/12
 * Rolling Array Improvement: m stages -> 2 stages
 * Update different initial states in each stage while iteration
 * Preset prevStage rather than currStage
 * 
 * T: O(m*n)
 * S: O(n)
 * Runtime: 104 ms
 */
var minDistance = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;

  let prevStage = new Array(n + 1).fill(0); // n states

  for (let j = 0; j < n + 1; j += 1) prevStage[j] = j;

  for (let i = 1; i < m + 1; i += 1) {
    let currStage = new Array(n + 1).fill(i); // Init initial stages for row i
    for (let j = 1; j < n + 1; j += 1) {
      let delta = (word1[i - 1] === word2[j - 1]) ? 0 : 1;
      currStage[j] = Math.min(
        prevStage[j - 1] + delta, // Replace
        prevStage[j] + 1, // Delete
        currStage[j - 1] + 1 // Insert
      );
    }
    prevStage = [...currStage]; // Copy currStage as prevStage for next iteration
  }

  return prevStage[n];
};

/**
 * 2019/11/23 Revisit
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  if (word1.length === 0) return word2.length;
  if (word2.length === 0) return word1.length;

  let stages = [];
  let states = new Array(word2.length + 1).fill(0);
  for (let i = 0; i < word1.length + 1; i += 1) {
    stages.push([...states]);
  }
  for (let i = 0; i < word1.length + 1; i += 1) {
    stages[i][0] = i;
  }
  for (let j = 0; j < word2.length + 1; j += 1) {
    stages[0][j] = j;
  }

  for (let i = 1; i < stages.length; i += 1) {
    for (let j = 1; j < stages[i].length; j += 1) {
      if (word1[i - 1] !== word2[j - 1]) {
        stages[i][j] = stages[i][j] = Math.min(stages[i - 1][j - 1], stages[i - 1][j], stages[i][j - 1]) + 1;
      } else {
        stages[i][j] = stages[i - 1][j - 1];
      }
    }
  }

  return stages[word1.length][word2.length];
};