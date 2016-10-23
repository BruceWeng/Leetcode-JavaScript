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

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

post(root); //14, 5, 2, 6, 7, 3, 1
