class Node {
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
    console.log(curr.value);

    if (curr.right !== null) {
      stack.push(curr.right);
    }

    if (curr.left !== null) {
      stack.push(curr.left);
    }
  }
}

/***************************************************** */

function dfs_recursion(root) {
  if (root === null) {
    return root;
  }

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

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

dfs(root); //1, 2, 4, 5, 3, 6, 7
dfs_recursion(root);
preorder_iteration(root);
