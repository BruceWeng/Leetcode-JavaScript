/**
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3


 */
/**
 * 
 * @param {number} val 
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
  if (root === null) {
    return true;
  }

  let queue = new Array();
  queue.push(root);

  while(queue.length !== 0) {
    let level = new Array();
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let head = queue.shift();

      if (head === null) {
        level.push(null);
        continue;
      } else {
        level.push(head.val);
      }

      queue.push(head.left);

      queue.push(head.right);
    }

    for (let i = 0; i <= Math.floor(size); i++) {
      if (level[i] !== level[size - 1 - i]) {
        return false;
      }
    }
  }

  return true;
}

let test1 = new TreeNode(1);
test1.left = new TreeNode(2);
test1.right = new TreeNode(2);
test1.left.left = new TreeNode(3);
test1.left.right = new TreeNode(4);
test1.right.left = new TreeNode(4);
test1.right.right = new TreeNode(3);

console.log(isSymmetric(test1)); //true

let test2 = new TreeNode(1);
test2.left = new TreeNode(2);
test2.right = new TreeNode(2);
test2.left.left = new TreeNode(null);
test2.left.right = new TreeNode(3);
test2.right.left = new TreeNode(null);
test2.right.right = new TreeNode(3);

console.log(isSymmetric(test2)); //false

let test3 = new TreeNode(3);

console.log(isSymmetric(test3)); //true
