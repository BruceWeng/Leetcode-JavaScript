class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function dfs(root) {
  if (root === null) {
    return root;
  }

  let stack = [];
  stack.push(root);

  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.right !== null) {
      stack.push(curr.right);
    }

    if (curr.left !== null) {
      stack.push(curr.left);
    }

    console.log(curr.value);
  }
}

/***************************************************** */

function dfs_recursion(root) {
  // base case when you hit the bottom of the tree
  if (root === null) {
    return root;
  }

  // recursive case
  console.log(root.value);
  if (root.left !== null) {
    dfs_recursion(root.left);
  }
  if (root.right !== null) {
    dfs_recursion(root.right);
  }
}

/***************************************************** */

class Guide {
  constructor(operation, node) {
    this.operation = operation; // 0: visit, 1: print
    this.node = node;
  }
}

function preorder_iteration(root) {
  let stack = [];
  stack.push(new Guide(0, root));

  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.node === null) continue;

    if (curr.operation === 1) {
      console.log(curr.node.value);
    } else {
      stack.push(new Guide(0, curr.node.right));
      stack.push(new Guide(0, curr.node.left));
      stack.push(new Guide(1, curr.node));
    }
  }
}

let root = new TreeNode("A");
root.left = new TreeNode("B");
root.right = new TreeNode("C");
root.left.left = new TreeNode("D");
root.left.right = new TreeNode("E");
root.right.left = new TreeNode("F");
root.right.right = new TreeNode("G");

// dfs(root); //1, 2, 4, 5, 3, 6, 7
dfs_recursion(root);
// preorder_iteration(root);
