/** input: [3,9,20,null,null,15,7]
 *  output: [
              [3],
              [9,20],
              [15,7]
            ]
*/
/**
 * Note:
 *  1. Important BFS template using queue and extra array
 */

 function TreeNode(val) {
   this.val = val;
   this.left = this.right = null;
 }

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
  let result = new Array();

  if (root === null) {
    return result;
  }

  let queue = new Array();
  queue.push(root);

  while (queue.length !== 0) {
    let level = new Array();
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let head = queue.shift();
      level.push(head.val);

      if (head.left !== null) {
        queue.push(head.left);
      }

      if (head.right !== null) {
        queue.push(head.right);
      }
    }

    result.push(level);
  }

  return result;
}

let test1 = new TreeNode(3);
test1.left = new TreeNode(9);
test1.right = new TreeNode(20);
test1.right.left = new TreeNode(15);
test1.right.right = new TreeNode(7);

console.log(levelOrder(test1));
