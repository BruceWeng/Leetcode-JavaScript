/**
Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.
 */
/**
 * Leetcode Fundamental: 11/5 Update
 * Failure:
 * 1. Fail to think of the command value should be currNode.val + child.val
 * 
 * Becareful to push Command Right in stack first than Command Left since last in first out
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
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  // Handle invaild input
  if (root === undefined || root === null || sum === undefined) return false;
  
  let stack = [Command(root.val, root)];
  while (stack.length !== 0) {
    let currCmd = stack.pop();
    // If we checked child node !== null before push it into stack, no need to check whether currCmd.node exist or not
    // if (currCmd.node === null) continue;
    let leftNode = currCmd.node.left;
    let rightNode = currCmd.node.right;
    
    // Check the sum value at leaf node
    if (leftNode === null && rightNode === null && currCmd.sum === sum) return true;
    
    // Push child Commmands in reversed order
    if (rightNode !== null) stack.push(Command(currCmd.sum + rightNode.val, rightNode));
    
    if (leftNode !== null) stack.push(Command(currCmd.sum + leftNode.val, leftNode));
  }
  
  return false;
};

function Command(sum, node) {
  return {
    sum,
    node
  }
}