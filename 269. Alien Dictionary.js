/**
There is a new alien language which uses the latin alphabet. 
However, the order among letters are unknown to you. You receive a list of non-empty words 
from the dictionary, where words are sorted lexicographically by the rules of this new language. 
Derive the order of letters in this language.

Note:

You may assume all letters are in lowercase.
You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
If the order is invalid, return an empty string.
There may be multiple valid order of letters, return any one of them is fine.
 */
/**
 * Algorithm: Graph: Topological Sort
 * Note: 
 * Topological Ordering: In directed graph, the graph is constructed following a specific order between parents and children
 * ex: Lexical order:
 *   B -- D    G
 *  /      \  /
 * A        F
 *  \      / \
 *   C -- E   H -- I
 * 
 * Topological sort algo can find a topological ordering in O(V + E) time
 * Note: 
 * a. Topological orderings are not unique
 * b. The graph have to be DAG (Directed Acyclic Graphs) aka. no cycle
 * c. If there is a cycle in the graph, no topological ordering
 * d. THe root can be any node that inDegree == 0
 */
/**
 * BFS solution
 */
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
  if (typeof words === "undefined" || words.length === 0) return "";

  let result = "";
  let nodeDependency = new Map(); // <char, Set(char)>
  let set = new Set(); // <set(char used in words)>
  let inDegree = new Array(26).fill(0); // <c.charCodeAt(0) - 97, count>

  // Add all chars used in words to set
  for (let word of words) {
    for (let char of word) {
      set.add(char);
    }
  }

  // Build dependency graph
  for (let i = 0; i < words.length - 1; i += 1) {
    let currWord = words[i];
    let nextWord = words[i+1];
    let len = Math.min(currWord.length, nextWord.length);

    for (let j = 0; j < len; j += 1) {
      let currChar = currWord[j];
      let nextChar = nextWord[j];
      if (currChar !== nextChar) {
        // Build neighbor set and update inDegree
        let neighborSet = nodeDependency.has(currChar) ? nodeDependency.get(currChar) : new Set();
        if (!neighborSet.has(nextChar)) { // avoid duplicates
          neighborSet.add(nextChar);
          nodeDependency.set(currChar, neighborSet);
          let index = nextChar.charCodeAt(0) - 97;
          inDegree[index] += 1;
        }
        break;
      }
    }
  }

  // Insert the nodes which have no parents
  let queue = [];
  for (let char of set) {
    let index = char.charCodeAt(0) - 97;
    if (inDegree[index] === 0) {
      queue.push(char);
    }
  }

  // BFS
  while (queue.length !== 0) {
    let char = queue.shift();
    result += char;
    if (!nodeDependency.has(char)) continue;
    for (let nextChar of nodeDependency.get(char)) {
      // decrease the degree and insert the new node which have no parents
      let index = nextChar.charCodeAt(0) - 97;
      inDegree[index] -= 1;
      if (inDegree[index] === 0) queue.push(nextChar);
    }
  }

  // Avoid the loop
  if (result.length !== set.size) return "";

  return result;
};

let input0 = [
  "ac",
  "ab",
  "b"
]
console.log(alienOrder(input0)); // "acb"

let input1 = [
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt",
  "te"
];
console.log(alienOrder(input1)); // "wertf"

let input2 = [
  "z",
  "x"
];
console.log(alienOrder(input2)); // "zx"

let input3 = [
  "z",
  "x",
  "z"
];
console.log(alienOrder(input3)); // "" (Explanation: The order is invalid, so return "")
