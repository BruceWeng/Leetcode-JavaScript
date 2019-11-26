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
var sumOfLeftLeaves = function (root) {
  let result = 0;
  dfs(root);
  return result;

  function dfs(node) {
    if (node === null) return;

    if (node.left !== null && node.left.left === null && node.left.right === null) {
      result += node.left.val;
    }

    dfs(node.left);
    dfs(node.right);
  }
};