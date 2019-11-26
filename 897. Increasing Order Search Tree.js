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
var increasingBST = function (root, next = null) {
  if (root === null) return next;

  let result = increasingBST(root.left, root);
  root.left = null;
  root.right = increasingBST(root.right, next);

  return result;
};