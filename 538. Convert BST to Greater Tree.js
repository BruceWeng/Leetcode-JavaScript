/**
Given a Binary Search Tree (BST), convert it to a Greater Tree such that every 
key of the original BST is changed to the original key plus sum of all keys 
greater than the original key in BST.

Example:

Input: The root of a Binary Search Tree like this:
              5
            /   \
           2     13

Output: The root of a Greater Tree like this:
             18
            /   \
          20     13
 */
/**
 * Algorithm: Reverse inorder traversal
 * Since this is a BST, we can do a reverse inorder traversal to traverse the 
 * nodes of the tree in descending order. In the process, we keep track of the 
 * running sum of all nodes which we have traversed thus far.
 * 
 * T: O(n)
 * S: O(n)
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const convertBST = function(root) {
  //1. Instance variable
  let sum = 0;

  // 2. Declare helper func
  const convert = function(node) {
    // 4. base case
    if (node === null) return;

    // 5. Recursive case (inorder modify node)
    convert(node.right);
    node.val += sum;
    sum = node.val;
    convert(node.left);
  }

  // 3. Invoke helper func
  convert(root);

  // 6. return node
  return root;
};

