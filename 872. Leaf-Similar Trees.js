/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  let leaf1 = [];
  let leaf2 = [];
  dfs(root1, leaf1);
  dfs(root2, leaf2);
  if (leaf1.length !== leaf2.length) return false;
  for (let i = 0; i < leaf1.length; i += 1) {
    if (leaf1[i] !== leaf2[i]) return false;
  }
  return true;

  function dfs(node, leaf) {
    if (node === null) return;

    if (node.left === null && node.right === null) leaf.push(node.val);

    dfs(node.left, leaf);
    dfs(node.right, leaf);
  }
};