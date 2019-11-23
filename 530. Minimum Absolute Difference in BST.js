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
var getMinimumDifference = function (root) {
  let min = Number.MAX_SAFE_INTEGER;
  let pre = -Number.MAX_SAFE_INTEGER;

  function inOrder(node) {
    if (node === null) return;

    inOrder(node.left);

    min = Math.min(min, Math.abs(node.val - pre));
    pre = node.val;

    inOrder(node.right);
  }

  inOrder(root);
  return min;
};