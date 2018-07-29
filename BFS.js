class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function bfs(root) {
  let queue = [];
  queue.push(root);

  // While the queue is not empty
  while (queue.length !== 0) {
    // 1. pull the first element in queue
    let curr = queue.shift();

    // 2. check if curr.left is empty
    if (curr.left !== null) {
      queue.push(curr.left);
    }

    // 3. check if curr.right is empty
    if (curr.right !== null) {
      queue.push(curr.right);
    }

    // 4.print it out
    console.log(curr.value);
  }
}

let root = new TreeNode("A");
root.left = new TreeNode("B");
root.right = new TreeNode("C");
root.left.left = new TreeNode("D");
root.left.right = new TreeNode("E");
root.right.left = new TreeNode("F");
root.right.right = new TreeNode("G");

console.log(bfs(root));

/**
 *        A
 *      /   \
 *     B     C
 *   /  \   / \
 *  D   E  F   G
 */