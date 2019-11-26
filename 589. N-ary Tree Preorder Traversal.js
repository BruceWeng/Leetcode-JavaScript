/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  let result = [];
  preOrder(root, result);
  return result;
};

function preOrder(node, result) {
  if (node === null) return;

  result.push(node.val);

  for (let child of node.children) {
    preOrder(child, result);
  }

  if (node.children.length === 0) preOrder(null, result);
}