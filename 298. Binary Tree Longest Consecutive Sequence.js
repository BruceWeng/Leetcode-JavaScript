/**
Given a binary tree, find the length of the longest consecutive sequence path.

The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).

Example 1:

Input:

   1
    \
     3
    / \
   2   4
        \
         5

Output: 3

Explanation: Longest consecutive sequence path is 3-4-5, so return 3.
Example 2:

Input:

   2
    \
     3
    / 
   2    
  / 
 1

Output: 2 

Explanation: Longest consecutive sequence path is 2-3, not 3-2-1, so return 2.
 */
/**
 * Leetcode Fundamental: 11/12 Update
 * Failure:
 * 1. Fail to think of anextra variable result to update length
 * 2. Fail to find the timing(child.val === curr.val) to update len
 * 88ms
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
var longestConsecutive = function(root) {
  if (root === undefined || root === null) return 0;
  
  let stack = [Command(root, 1)];
  let result = 0;
  while (stack.length !== 0) {
    let { node, len } = stack.pop();
    let right = node.right;
    let left = node.left;
    
    if (right !== null) {
      let rightLen = (right.val === node.val + 1)? len + 1: 1;
      stack.push(Command(right, rightLen));
    }

    
    if (left !== null) {
      let leftLen = (left.val === node.val + 1)? len + 1: 1;
      stack.push(Command(left, leftLen));
    }

    result = Math.max(result, len);
  }

  return result;
};

function Command(node, len) {
  return {
    node,
    len
  }
}