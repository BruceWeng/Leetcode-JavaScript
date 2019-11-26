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
var longestUnivaluePath = function (root) {
  if (root === null) return 0;
  let result = 0;
  postOrder(root, root.val);
  return result;

  function postOrder(node, pre) {
    if (node === null) return 0;

    let left = postOrder(node.left, node.val);
    let right = postOrder(node.right, node.val);

    result = Math.max(result, left + right);
    if (node.val === pre) return Math.max(left, right) + 1;
    else return 0;
  }
};