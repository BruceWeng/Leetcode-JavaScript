/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function (root, L, R) {
  if (root === null) return 0;
  let result = [0];
  inOrder(root, L, R, result);
  return result[0];
};

function inOrder(node, L, R, result) {
  if (node === null) return;

  inOrder(node.left, L, R, result);

  if (node.val >= L && node.val <= R) result[0] += node.val;

  inOrder(node.right, L, R, result);
}