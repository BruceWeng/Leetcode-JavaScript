/**
Invert a binary tree.

Example:

Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1
 */
/**
 * Leetcode Fundamenta: 11/5 Update
 * 
 * Failure: 
 * 1. Fail to think of using BFS
 * 2. Fail to think of it will not work passing TreeNode in swap func -> should direct swap
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // Handle invalid inputs: 
  if (root === undefined || root === null) return null;
  
  // Level order traversal the tree and swap currNode.left and currNode.right
  // Push currNode.left and currNode.right in queue in order
  let queue = [root];
  while (queue.length !== 0) {
    let levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i += 1) {
      let currNode = queue.shift();
      // Swap currNode.left and currNode.right
      [ currNode.left, currNode.right ] = [ currNode.right, currNode.left ];
      
      if (currNode.left !== null) queue.push(currNode.left);
      
      if (currNode.right !== null) queue.push(currNode.right);
    }
  }
  
  return root;
};
