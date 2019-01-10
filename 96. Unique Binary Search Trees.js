/**
Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?

Example:

Input: 3
Output: 5
Explanation:
Given n = 3, there are a total of 5 unique BST's:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
 */
/**
 * Leetcode Fundamental: 12/13 Update
 * NOT A TREE QUESTION!
 * 
 * Clever to think of the pattern in the sequence and induct a transfer function.
 * Multiple prev stages used DP
 * 
 * Construct Unique Tree:
 * 1. Iterate the sequence and select the element as  the root
 * 2. Elements in the left subsequence are in left subtree. Elements in the right subsequence are in right subtree.
 * 3. Recursively do 1.and 2. will generate all unique BST since they have unique roots
 * 
 * Naive Time Complexity: 
 * 1. Select roots: O(n)
 * 2. Recursively find children: O(nlogn)
 * 3. Total: O(n^2*logn)
 * 
 * DP Solution:
 * 1. Declare stages stores total number of unique BST for sequence of length n. Answer: stages[-1]
 * 1.a Need to use one more space stages[0] = 1 as empty node in subtree
 * 2. Iterate stages and stages[curr] will be sum of (amount of left subtree * amount of right subtree)
 * Induction:
 * n = 3: [1, 2, 3]
 * f(i, n): number of unique BST select i as root, i in [1, n] (include)
 * stages(n) = f(1, n) + f(2, n) + ... + f(n, n) ...(A)
 * 
 * Select 1 as root: f(1, 3) = stages(0)*stages(2) = 1 * 2 = 2, stages[1] = 2
 * Select 2 as root: f(2, 3) = stages(1)*stages(1) = 1 * 1 = 1, stages[2] = 2 + 1 = 3
 * Select 3 as root: f(3, 3) = stages(2)*stages(0) = 2 * 1 = 2. stages[3] = 2 + 1 + 2 = 5
 * Transfer function: f(i, n) = stages(i-1)*stages(n-i), 1 <= i <= n ... (B)
 * 
 * From (A) and (B):
 * stages(n) = stages(0)*stages(n-1) + stages(1)*stages(n-2) + ... + stages(n-1)*stages(0)
 * 
 * 2.a Amount of left subtree: stages[i]
 * 2.b Amount of right subtree: stages[n-i]
 * 3. Return stages[n]
 * 
 * T: O(n^2), S: O(n)
 * Runtime: 72 ms
 */
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  if (n <= 0) return 0;
  let stages = new Array(n+1).fill(0);
  stages[0] = 1;
  for (let curr = 1; curr < n+1; curr += 1) {
    for (let i = 0; i < curr; i += 1) {
      // Update stage from subsequence stage
      stages[curr] += stages[i] * stages[curr-1-i]; // curr-1: length of subsequence
    }
  }
  
  return stages[n];
};
