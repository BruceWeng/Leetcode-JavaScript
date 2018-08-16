/**
Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its depth = 3.
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
const maxDepth = function(root) {
  // 1. Declre instance variable
  let result = 0; // depth
  
  // 3. Declare helper function
  const helper = function(node, level) {
    // Base Case
    if (node === null) {
      return;
    }
    // Update result (instance variable)
    result = Math.max(result, level);
    // if (level > result) result = level;
  
    // Recursive Case
    helper(node.left, level + 1);
    helper(node.right, level + 1);
  };

  // 4. Invoke the helper function
  helper(root, 1);

  // 2. return instance variable
  return result;
};