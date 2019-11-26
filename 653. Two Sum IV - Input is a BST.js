/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  let set = new Set();
  return dfs(root, k);

  function dfs(node, k) {
    if (node === null) return false;

    if (!set.has(node.val)) set.add(k - node.val);
    else return true;

    return dfs(node.left, k) || dfs(node.right, k);
  }
};