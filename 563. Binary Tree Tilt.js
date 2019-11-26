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
var findTilt = function (root) {
  let result = 0;
  postOrder(root);
  return result;

  function postOrder(node) {
    if (node === null) return 0;

    let left = postOrder(node.left);
    let right = postOrder(node.right);

    result += Math.abs(left - right);
    return left + right + node.val;
  }
};