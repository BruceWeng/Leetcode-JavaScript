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

var minDiffInBST = function (root) {
  if (root === null) return 0;
  let min = Number.MAX_SAFE_INTEGER;
  let pre = -Number.MAX_SAFE_INTEGER;
  function inorder(node) {
    if (node === null) return;
    inorder(node.left);
    min = Math.min(min, Math.abs(node.val - pre));
    pre = node.val;
    inorder(node.right);
  }
  inorder(root);
  return min;
};