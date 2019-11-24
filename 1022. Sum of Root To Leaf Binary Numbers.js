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
var sumRootToLeaf = function (root) {
  return dfs(root, 0); // Have to pass parent in dfs because each node has its own parent value.

  function dfs(node, val) {
    if (node === null) return 0;

    val = val * 2 + node.val;

    if (node.left === null && node.right === null) return val;
    return dfs(node.left, val) + dfs(node.right, val);
  }
};

// Solution: pass parent value in dfs and update val = val * 2 + node.val
// Because one level deeper, parent should be squared.
// Steps:
// When node === null, return 0.
// Update val.
// When visit leaf node, return val.
// For currentNode, val = leftVal + rightVal.