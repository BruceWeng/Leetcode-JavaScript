/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
const searchBST = (root, target) => {
  if (root === null) return null;

  if (root.val === target) return root;
  return (root.val > target) ? searchBST(root.left, target) : searchBST(root.right, target);
};