/**
Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
Example 1:

Input:
    2
   / \
  1   3
Output: true
Example 2:

    5
   / \
  1   4
     / \
    3   6
Output: false
Explanation: The input is: [5,1,4,null,null,3,6]. The root node's value
             is 5 but its right child's value is 4.
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 1. Define Return Type
class ReturnType {
  constructor(isBST, maxValue, minValue) {
    this.isBST = isBST;
    this.maxValue = maxValue;
    this.minValue = minValue;
  }
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function(root) {
  // 3. Return Helper function
  return helper(root).isBST;
};

// 2. Define Helper function
const helper = function(node) {
  // 4. Base Case
  if (node === null) {
    return new ReturnType(true, 
      Number.MIN_SAFE_INTEGER, 
      Number.MAX_SAFE_INTEGER);
  }

  // 5. Recursive Case
  // 5.1 Find left subtree
  // left is ReturnType, not a TreeNode
  let left = helper(node.left);
  // 5.2 Find right subtree
  // right is ReturnType, not a TreeNode
  let right = helper(node.right);

  // 5.3 Handle false cases
  if (!left.isBST || !right.isBST) {
    return new ReturnType(false, 0, 0);
  }

  if (node.left !== null && left.maxValue >= node.val || 
      node.right !== null && right.minValue <= node.val) {
    return new ReturnType(false, 0, 0);
  }


  // 5.4 Handle true case
  return new ReturnType(true,
    Math.max(node.val, right.maxValue),
    Math.min(node.val, left.minValue));
};
