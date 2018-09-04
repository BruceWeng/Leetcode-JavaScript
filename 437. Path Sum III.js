/**
You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, but it must go downwards 
(traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

Example:

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

Return 3. The paths that sum to 8 are:

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11
 */
/**
 * Algorithm: Backtracking + Memorization
 * 1. Declare a preSum:(key: currSum - target, val: how many ways for the path)
 * 2. Initiate preSum(0, 1) since if preSum is 0, still counts 1 ways
 * 3. Declare result = 0 storing how many ways for the path and update by helper func
 * 4. Declare a helper func(node): (Use the side effect to update)
 *      a. Base condition:
 *        if (node == null) return
 *      b. Update currSum: 
 *         currSum += node.val
 *      c. Update result: 
 *         if preSum.has(currSum - target):
 *           result += preSum.get(currSum - target)
 *      d. Update preSum:
 *         if not preSum.has(currSum):
 *           preSum.set(currSum, 1)
 *         else:
 *           preSum.set(currSum, preSum.get(currSum) + 1)
 *      e. Traverse left and right node:
 *         helper(node.left)
 *         helper(node.right)
 *      f. Backtracking: Restore preSum value to its partent value
 *         preSum.set(currSum, preSum.get(currSum) - 1)
 * 5. return result
 * 
 * T: O(n), no revisit each node, S: O(n): preSum
 * 
 * Note: can be approve by use custom Map.getorDefault(key, defaultVal) to prevent using global result 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
let cache = new Map();
cache.getOrDefault = function(key, defaultVal) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  else {
    cache.set(key, defaultVal);
    return defaultVal;
  }
};
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
const pathSum = function(root, sum) {
  let preSum = new Map();
  preSum.set(0, 1);
  let result = 0;

  // For the variables that changes along with the node such as currSum, pass it into helper func
  const helper = function(node, currSum) {
    if (node === null) return;

    currSum += node.val;

    if (preSum.has(currSum - sum)) {
      result += preSum.get(currSum - sum);
    }

    if (!preSum.has(currSum)) {
      preSum.set(currSum, 1);
    } else {
      preSum.set(currSum, preSum.get(currSum) + 1);
    }

    helper(node.left, currSum);
    helper(node.right, currSum);

    preSum.set(currSum, preSum.get(currSum) - 1);
  }

  helper(root, 0);
  return result;
};
