/**
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3

But the following [1,2,2,null,3,null,3] is not:
    1
   / \
  2   2
   \   \
   3    3
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
 * Leetcode Fundamental: 11/12 Update
 * 64 ms
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
  if (root === null) {
    return true;
  }

  let queue = [];
  queue.push(root);

  while(queue.length !== 0) {
    let level = new Array();
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let head = queue.shift();

      // Have to push null in level since we need to compare by reflection position 
      if (head === null) {
        level.push(null);
        continue;
      } else {
        level.push(head.val);
      }

      queue.push(head.left);

      queue.push(head.right);
    }

    // Check equality of first element and last element in level array
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

/**
 * Leetcode Fundamental: 11/12 Update
 * 60ms
 * Failure:
 * 1. Fail to use a helper func to pass left and right
 */
var isSymmetric = function(root) {
  if (root === undefined) return false;
  if (root === null) return true;
  return isMirror(root.left, root.right);
};

const isMirror = (left, right) => {
  // case 1 return true
  if (left === null && right === null) return true;
  if (left === null || right === null) return false;
  // case 2 return true:
  // 1. left.val === right.val
  // 2. isMirror(left.left, right.right)
  // 3. isMirror(left.right, right.left)
  return (left.val === right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left));
};