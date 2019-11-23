/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  if (preorder.length === 0) return null;
  let idx = 0;
  return dfs(Number.MAX_SAFE_INTEGER);

  function dfs(bound) {
    if (preorder[idx] > bound || idx === preorder.length) return null;

    let root = new TreeNode(preorder[idx]);
    idx += 1
    root.left = dfs(root.val);
    root.right = dfs(bound);

    return root;
  }
};

// Solution 1: Sort preorder array, and covert sorted array to BST -> T: O(NlogN)

// Solution 2: Iterate preorder array by dfs building TreeNodes with max boundary. 
// Left recursion max boundary will be node.val ,and 
// right recursion max boundary can be any value (<= max integer). 
// In total at most visit N nodes -> T: O(N)

