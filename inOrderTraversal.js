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

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

inOrder(root); //4, 2, 5, 1, 6, 3, 7
