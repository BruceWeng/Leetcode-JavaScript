/**
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its minimum depth = 2.
 */
/**
 * Leetcode Fundamental: 11/12 Update
 * BFS and return the level when find the first leaf taht left === null and right === null
 * 60ms
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  if (root === undefined || root === null) return 0;

  let queue = [root];
  let level = 1; // Need to initiate 1
  while (queue.length !== 0) {
    let size = queue.length;
    for (let i = 0; i < size; i += 1) {
      let node = queue.shift();
      if (node.left === null && node.right === null) return level;
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    level += 1;
  }
};

/**
 * Recursive solution: 64ms
 */
var minDepth = function(root) { // return minimum depth for each level
  if (root === undefined || root === null) return 0;
  let left = minDepth(root.left);
  let right = minDepth(root.right);
  // Case 1: if left === 0 and right === 0: return 1
  // case 2: if left !== 0 and right === 0: return left + 1
  // Case 3: if left === 0 and right !== 0: return right + 1
  if (left !== 0 && right !== 0) return Math.min(left, right) + 1;
  else return left + right + 1;
  // Case 4: if left !== 0 and right !== 0: return min(left, right) + 1
};