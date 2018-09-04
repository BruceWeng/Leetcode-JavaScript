/**

Given two non-empty binary trees s and t, check whether tree t has exactly the same structure 
and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all 
of this node's descendants. The tree s could also be considered as a subtree of itself.

Example 1:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4 
  / \
 1   2
Return true, because t has the same structure and node values with a subtree of s.
Example 2:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false.
 */
/**
 * Algorithm:
 * Recursion helper func in Recursion isSubtree func!!!
 * T: O(n) visiting each node
 * S: O(n) recursion
 */
/**
 * Data Type used for maintaining multiple values for each level
 */
// 1. Define Data Type
class Data {
  constructor(isSubTree) {
    this.isSubTree = isSubTree;
  }
}

/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
const isSubtree = function(s, t) {
  // 3. isSubtree base case 1
  if (s === null) return false;
  
  // 3. isSubtree base case 2
  if (helper(s, t).isSubTree) return true;

  // 4.isSubtree recursive case:
  // t is either subTree of s.left or s.right
  return isSubtree(s.left, t) || isSubtree(s.right, t);

};

// 2. Define helper func
/**
 * 
 * @param {TreeNode} s 
 * @param {TreeNode} t
 * @return {Data}
 */
const helper = function(s, t) {
  // 5. Base case
  if (s === null && t === null) return new Data(true);
  if (s === null || t === null) return new Data(false);

  // 6. Handle false case
  if (s.val !== t.val) return new Data(false);

  // 7. Recursive case
  if (helper(s.left, t.left).isSubTree && helper(s.right, t.right).isSubTree) {
    return new Data(true);
  } else {
    return new Data(false);
  }
}