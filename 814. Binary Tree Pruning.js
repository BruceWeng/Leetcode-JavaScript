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
  postOrder(root);
  return root;
};

function postOrder(node) {
  if (node === null) return null;

  node.left = postOrder(node.left);
  node.right = postOrder(node.right);

  if (node.left === null && node.right === null && node.val === 0) return null;
  else return node;
}