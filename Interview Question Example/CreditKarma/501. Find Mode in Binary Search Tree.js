/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
  if (root === null) return [];
  let result = [];
  let max = 0;
  let count = 1;
  let pre = null;
  inOrder(root);
  return result;

  function inOrder(node) {
    if (node === null) return;

    inOrder(node.left);

    if (pre !== null && node.val === pre) {
      count += 1;
    } else {
      count = 1;
    }

    if (count > max) {
      result = [];
      result.push(node.val);
    }
    if (count === max) {
      result.push(node.val);
    }

    max = Math.max(max, count);

    pre = node.val; // Update pre here!
    inOrder(node.right);
  }
};