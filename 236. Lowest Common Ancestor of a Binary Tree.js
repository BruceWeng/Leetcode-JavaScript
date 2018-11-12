/**
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Given the following binary tree:  root = [3,5,1,6,2,0,8,null,null,7,4]

        _______3______
       /              \
    ___5__          ___1__
   /      \        /      \
   6      _2       0       8
         /  \
         7   4
Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of of nodes 5 and 1 is 3.
Example 2:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself
             according to the LCA definition.
Note:

All of the nodes' values will be unique.
p and q are different and both values will exist in the binary tree.
 */
/**
 * Leetcode Fundamental: 11/9 Update
 * 
 * Command approach does not work for the question:
 * 1. Need to pass value form child to parent
 * 2. Or value of parent need to be check by the condition of the children
 * 
 * Iterative solution must need extra space to remember the path to look back:
 * ex:
 * pathP = [3, 5] for p = 5
 * pathQ = [3, 5, 2, 4] for q = 4
 * LCA = 5
 * 
 * T: O(n), S: O(height(tree))
 * 
 * Recursive solution: 72ms
 * There are 4 candidates for lca: (Missing one)
 * 1. p or q is found in current node: lca = found value(p or q)
 * 2. If node.left === null and node.right === null: lca = null
 * 3. One of the child lca === p and the other lca === q: lca = current node.val
 * Fail to think of this step:
 *    return value can only be null or p or q
 *    so the logic if one of child if p and the other is q can be wriiten as
 *    if (left !== null && right !== null) return root 
 * 4. One of the child lca === p or q and the other is null: lca = p or q
 * 
 * Main func return value as lca!
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (root === null || root === undefined || p === undefined || q === undefined) return null;
  // 1. 
  if (root === p || root === q) return root;

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // 2.
  if (left === null && right === null) return null;

  // 3. Fail to think of this step!
  if (left !== null && right !== null) return root; // p and q are in left and right
  // 4.
  if (left !== null) return left; // Find p or q in left branch
  return right; // Find p or q in right branch
};

/**
 * Iterative solution: Graph and DFS 11/12 Update
 * 120 ms
 * 1. Use an edge hashmap to store child-parent relationship, key: child, value: parent
 * 2. Using DFS Keep adding edge to hashmap until both p and q are found
 *    ( while (!edge.has(p) || !edge.has(q)) )
 * 3. Put all the parent node of p in a set
 * 4. Find all the parent node of q until q is in the set
 * 5. Return q (the common lowest parent)
 */
var lowestCommonAncestor2 = function(root, p, q) {
  // Use Map rather than object becuase we store reference of TreeNode as key
  // 1.
  let edge = new Map();
  edge.set(root, null);
  
  let stack = [root];
  // 2.
  while (!edge.has(p) || !edge.has(q)) {
    let currNode = stack.pop();

    if (currNode.right !== null) {
      edge.set(currNode.right, currNode);
      stack.push(currNode.right);
    }

    if (currNode.left !== null) {
      edge.set(currNode.left, currNode);
      stack.push(currNode.left);
    }
  }

  // 3.
  let set = new Set();
  while (p !== null) {
    set.add(p);
    p = edge.get(p);
  }

  // 4.
  while (!set.has(q)) {
    q = edge.get(q);
  }

  // 5.
  return q;
};

// [3,5,1,6,2,0,8,null,null,7,4]
// 5
// 1
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

             // 3
            // / \
           // 5   1
          ///  \  / \
        // 6   2 0   8
      // /  \ / \
    //  n  n 7  4
let root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);
console.log(lowestCommonAncestor2(root, root.left, root.right));