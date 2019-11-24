/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function (root) {
  if (root == null) return true;

  if (root.left !== null && root.left.val !== root.val) return false;
  if (root.right !== null && root.right.val !== root.val) return false;

  return isUnivalTree(root.left) && isUnivalTree(root.right);
};

// Solution: If a node has children, every child should be unival tree and has same value. (PostOrder)