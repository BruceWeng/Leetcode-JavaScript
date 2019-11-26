/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  let queue = [];
  queue.push(root);

  while (queue.length !== 0) {
    let size = queue.length;
    let xExist = false;
    let yExist = false;
    // same level
    for (let i = 0; i < size; i += 1) {
      let node = queue.shift();

      if (node.val === x) xExist = true;
      if (node.val === y) yExist = true;

      if (node.left !== null && node.right !== null) {
        if (node.left.val === x && node.right.val === y) return false;
        if (node.left.val === y && node.right.val === x) return false;
      }

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    // same level
    if (xExist && yExist) return true;
    else if (xExist || yExist) return false;
  }
  return false;
};