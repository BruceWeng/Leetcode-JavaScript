/**
Given a binary tree, return all root-to-leaf paths.

Note: A leaf is a node with no children.

Example:

Input:

   1
 /   \
2     3
 \
  5

Output: ["1->2->5", "1->3"]

Explanation: All root-to-leaf paths are: 1->2->5, 1->3
 */
/**
 * Leetcode Fundamental: 11/5 Update
 * Failure:
 * 1. Should pass node to command first since it's easy to miis if we pass it as second param
 * 
 * Note: Recursion actually faster
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  if (root === undefined || root === null) return [];

  let result = [];
  let stack = [Command(root, String(root.val))];

  while (stack.length !== 0) {
    let currCmd = stack.pop();
    let leftNode = currCmd.node.left;
    let rightNode = currCmd.node.right;

    if (leftNode === null && rightNode === null) result.push(currCmd.path);

    if (rightNode !== null) stack.push(Command(rightNode, currCmd.path + "->" + String(rightNode.val)));

    if (leftNode !== null) stack.push(Command(leftNode, currCmd.path + "->" + String(leftNode.val)));
  }

  return result;
};

function Command(node, path) {
  return {
    node,
    path // string
  }
}

/**
 * Recursive solution
 */
var binaryTreePaths = function (root) {
  if (root === undefined || root === null) return [];

  let result = [];

  let path = String(root.val);

  traverse(root, path, result);

  return result;
};

function traverse(node, path, result) {
  if (node.left === null && node.right === null) {
    result.push(path);
    return;
  }

  if (node.left !== null) traverse(node.left, path + "->" + String(node.left.val), result);

  if (node.right !== null) traverse(node.right, path + "->" + String(node.right.val), result);
}

/**
 * 2019/11/23 Revisit
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let result = [];
  if (root === null) return result;
  dfs(root, "");
  return result;

  function dfs(node, path) {
    if (node === null) return;
    if (node.left === null && node.right === null) {
      result.push(path + node.val);
    }

    path += node.val + '->';

    dfs(node.left, path);
    dfs(node.right, path);
  }
};