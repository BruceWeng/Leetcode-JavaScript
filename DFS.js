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

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

dfs(root); //1, 2, 4, 5, 3, 6, 7
