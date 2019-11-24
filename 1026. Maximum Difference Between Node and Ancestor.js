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
var maxAncestorDiff = function (root) {

  return dfs(root, root.val, root.val);

  function dfs(node, max, min) {
    if (node === null) return max - min;

    max = Math.max(max, node.val);
    min = Math.min(min, node.val);

    let leftMax = dfs(node.left, max, min);
    let rightMax = dfs(node.right, max, min);

    return Math.max(leftMax, rightMax);
  }
};

// Solution: the answer must be max - min from all the value along each root - leaf branches.
// At leaf node, return max - min.
// Do postOrder and pass down max and min value to the children.
// At currentNode, return larger value from left and right child.