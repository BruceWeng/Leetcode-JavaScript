/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    let result = [];
    if (root === null) {
        return result;
    }

    let queue = [];
    queue.push(root);

    while(queue.length !== 0) {
        let level = [];
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let head = queue.shift();
            level.push(head.val);

            if (head.left !== null) {
                queue.push(head.left);
            }

            if (head.right !== null) {
                queue. push(head.right);
            }
        }

        result.unshift(level);
    }

    return result;
};
