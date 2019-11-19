/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  if (root === null) return [];
  let result = [];
  postOrder(root, result);
  return result;
};

function postOrder(node, result) {
  // 1. base case, if node === undefined: return
  // 2. recursive case
  // 2.1 visit all the childrens
  // 2.2 add node.val to result
  if (node === undefined) return;
  for (let i = 0; i < node.children.length; i += 1) {
    postOrder(node.children[i], result);
  }
  if (node.children.length === 0) postOrder(undefined, result);
  result.push(node.val);
}

