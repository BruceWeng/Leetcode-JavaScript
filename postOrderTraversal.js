class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function post(root) {
  if (root === null) {
    return root;
  }

  let prev = null;
  let stack = [];
  stack.push(root);

  while (stack.length !== 0) {
    curr = stack[stack.length - 1];

    if ( prev === null || prev.left === curr || prev.right === curr) {
      if (curr.left !== null) {
        stack.push(curr.left);
      } else if (curr.right !== null) {
        stack.push(curr.right);
      }
    } else if (curr.left === prev) {
      if (curr.right !== null) {
        stack.push(curr.right);
      }
    } else {
      console.log(curr.value);
      stack.pop();
    }

    prev = curr;
  }
}

/***************************************************** */

function postorder_recursion(root) {
  if (root === null) {
    return root;
  }

  if (root.left !== null) {
    postorder_recursion(root.left);
  }


  if (root.right !== null) {
    postorder_recursion(root.right);
  }

  console.log(root.value);
}

/***************************************************** */

class Guide {
  constructor(operation, node) {
    this.operation = operation; // 0: visit, 1: print
    this.node = node;
  }
}

function postorder_iteration(root) {
  let stack = [];
  stack.push(new Guide(0, root));

  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.node === null) continue;

    if (curr.operation === 1) {
      console.log(curr.node.value);
    } else {
      stack.push(new Guide(1, curr.node));
      stack.push(new Guide(0, curr.node.right));
      stack.push(new Guide(0, curr.node.left));
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

post(root); //4, 5, 2, 6, 7, 3, 1
postorder_recursion(root);
postorder_iteration(root);
