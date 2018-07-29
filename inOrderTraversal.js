class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function inOrder(root) {
  if (root === null) {
    return root;
  }

  let stack = [];
  let curr = root;
  while (curr !== null) {
    stack.push(curr);
    curr = curr.left;
  }

  while (stack.length !== 0) {
    curr = stack.pop();
    console.log(curr.value);
    if (curr.right !== null) {
      curr = curr.right;

      while (curr !== null) {
        stack.push(curr);
        curr = curr.left;
      }
    }

  }
}

/***************************************************** */

function inorder_recursion(root) {
  if (root === null) {
    return root;
  }

  if (root.left !== null) {
    inorder_recursion(root.left);
  }

  console.log(root.value);

  if (root.right !== null) {
    inorder_recursion(root.right);
  }
}

/***************************************************** */

class Guide {
  constructor(operation, node) {
    this.operation = operation; // 0: visit, 1: print
    this.node = node;
  }
}

function inorder_iteration(root) {
  let stack = [];
  stack.push(new Guide(0, root));

  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.node === null) continue;

    if (curr.operation === 1) {
      console.log(curr.node.value);
    } else {
      stack.push(new Guide(0, curr.node.right));
      stack.push(new Guide(1, curr.node));
      stack.push(new Guide(0, curr.node.left));
    }
  }
}

let root = new Node("A");
root.left = new Node("B");
root.right = new Node("C");
root.left.left = new Node("D");
root.left.right = new Node("E");
root.right.left = new Node("F");
root.right.right = new Node("G");

// inOrder(root); //4, 2, 5, 1, 6, 3, 7
inorder_recursion(root);
// inorder_iteration(root);
