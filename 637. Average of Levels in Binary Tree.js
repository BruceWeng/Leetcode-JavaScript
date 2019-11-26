/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  let result = [];
  let queue = [root];

  while (queue.length !== 0) {
    let sum = 0;
    let size = queue.length;
    for (let i = 0; i < size; i += 1) {
      let node = queue.shift();
      sum += node.val;
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    let average = sum / size;
    result.push(average);
  }
  return result;
};