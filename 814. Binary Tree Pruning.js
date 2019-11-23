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
var pruneTree = function (root) {
  if (root === null) return null;
  dfs(root);
  return root;
};

function dfs(node) {
  if (node === null) return null;

  node.left = dfs(node.left);
  node.right = dfs(node.right);

  if (node.left === null && node.right === null && node.val === 0) return null;
  else return node;
}