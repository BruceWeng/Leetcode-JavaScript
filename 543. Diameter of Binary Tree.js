/**
Given a binary tree, you need to compute the length of the diameter of the tree. 
The diameter of a binary tree is the length of the longest path between any two 
nodes in a tree. This path may or may not pass through the root.

Example:
Given a binary tree 
          1
         / \
        2   3
       / \     
      4   5    
Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].

Note: The length of path between two nodes is represented by the number of edges 
between them.
 */
/**
 * Algorithm:
 * For every node, length of longest path which pass it = 
 * MaxDepth of its left subtree + MaxDepth of its right subtree.
 * 
 * Reference: 104. Maximum Depth of Binary Tree
 * T: O(n), S: O(n)
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const diameterOfBinaryTree = function(root) {
  //1. Instance variable
  let result = 0
  // 2. Declare helper func
  const helper = function(node) {
    // 5. Base case
    if (node === null) return 0;
    // 6. Recursive case
    let left = helper(node.left);
    let right = helper(node.right);
    result = Math.max(result, left + right);
    return Math.max(left, right) + 1;
  }

  // 3. Invoke helper func
  helper(root);

  // 4. return instance variable
  return result;
};