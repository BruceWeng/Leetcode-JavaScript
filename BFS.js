class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function bfs(root) {
  let queue = [];
  queue.push(root);

  while (queue.length !== 0) {
    let curr = queue.shift();
    console.log(curr.value);

    if (curr.left !== null) {
      queue.push(curr.left);
    }

    if (curr.right !== null) {
      queue.push(curr.right);
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

bfs(root);
