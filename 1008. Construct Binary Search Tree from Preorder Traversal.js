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

// 2020/02/12 Revisited
// 1. Use destructuring passing params.
// 2. Debug: print all the params in the beginning of func dfs to show the recursion stack.
// 3. Always use Java solution because it does not support closure and params can not be hidden from helper function.
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
let idx = 0;
var bstFromPreorder = function (preorder) {
  if (preorder.length === 0) return null;
  return dfs({ preorder, idx, bound: Number.MAX_SAFE_INTEGER });
};

function dfs({ preorder, bound }) {
  console.log({ idx });
  console.log({ preorder, bound });
  if (preorder[idx] > bound || idx === preorder.length) return null;

  let root = new TreeNode(preorder[idx]);
  idx += 1;
  root.left = dfs({ preorder, bound: root.val });
  root.right = dfs({ preorder, bound });

  return root;
}