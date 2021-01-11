/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = root => {
  if (root === undefined || root === null) return [];
  let result = [];
  inorderHelper(root, result);
  return result;
};

const inorderHelper = (root, result) => {
  if (root === null) return;

  inorderHelper(root.left, result); // traverse left subtree
  result.push(root.val); // visit the root
  inorderHelper(root.right, result); // traverse right subtree
};

// Iterative solution
function Command(action, node) {
  return {
    action, // 0: visit, 1: push to result
    node
  };
}

const inorderIter = root => {
  if (root === undefined || root === null) return [];
  let result = [];
  let stack = [new Command(0, root)];
  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.action === 1) {
      result.push(curr.node.val);
      continue;
    }

    // Put next action for nodes in reversed order
    // (1. Visit left node, 2. Push curr node, 3. Visit right node)
    if (curr.node.right !== null) stack.push(new Command(0, curr.node.right));
    stack.push(new Command(1, curr.node));
    if (curr.node.left !== null) stack.push(new Command(0, curr.node.left));
  }

  return result;
};