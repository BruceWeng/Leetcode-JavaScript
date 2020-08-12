/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Exhaustive
 * 1. Use start and end to narrow down the range of candidate nodes.
 * 2. Create TreeNode if start <= end, else push null to result.
 * 3. Create recursive func to get left and right node list based on range.
 * 4. Use Exhaustive method to link leftNode from leftNode list and rightNode from rightNode list.
 * 
 * T: O(N/2) * O(N/2) = O(N^2)
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  if (n === 0) return [];
  return getNodeList(1, n);
};

const getNodeList = (start, end) => {
  let result = [];
  if (start > end) result.push(null);

  for (let i = start; i <= end; i += 1) {
    let leftNodeList = getNodeList(start, i - 1);
    let rightNodeList = getNodeList(i + 1, end);

    for (leftNode of leftNodeList) {
      for (rightNode of rightNodeList) {
        let node = new TreeNode(i);
        node.left = leftNode;
        node.right = rightNode;
        result.push(node);
      }
    }
  }
  return result;
}