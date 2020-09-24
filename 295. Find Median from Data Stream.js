/**
 * Java solution using BST, with explanation, beats 99% at time of posting
 * The idea is to use a BST to store the stream of integers. When adding nodes to the tree, we keep a pointer to the median node (middle node if odd number of elements, smaller of the two middle nodes if even number of elements).

Two helper functions - getNext and getPrev, allow us to update the median node.

When should the median node be updated? Only two cases, both considering we have just added a node to the BST:

We have an even number of elements, and the value added was less than the median value.

We have an odd number of elements, and the value added was higher or equal to the median value.

class Node {
    int val;
    Node right;
    Node left;
    Node parent;
    public Node(int val){this.val = val;}
}

public class MedianFinder {
    Node tree;
    Node medianNode;
    int numElements = 0;
    boolean addedLower = false;
    
    // Adds a number into the data structure.
    public void addNum(int num) {
        Node newNode = new Node(num);
        addNode(tree, newNode);
        numElements++;
        if (num < medianNode.val){
            addedLower = true;
        } else {
            addedLower = false;
        }
        updateMedianNode();
    }

    // Returns the median of current data stream
    public double findMedian() {
        // even number of elements
        if (numElements % 2 == 0){
            double num1 = medianNode.val;
            double num2 = getNext(medianNode).val;
            return (num1+num2)/2.0;
        }
        // odd number of elements
        return medianNode.val;
    }
    
    // add node to BST
    private void addNode(Node curr, Node newNode){
        if (curr == null){
            tree = newNode;
            medianNode = tree;
            return;
        }
        if (curr.val > newNode.val){
            if (curr.left == null){
                curr.left = newNode;
                curr.left.parent = curr;
            } else {
                addNode(curr.left, newNode);
            }
        } else if (curr.val <= newNode.val){
            if (curr.right == null){
                curr.right = newNode;
                curr.right.parent = curr;
            } else {
                addNode(curr.right, newNode);   
            }
        }
    }
    
    // keep pointing to median
    private void updateMedianNode(){
        if (numElements == 1){
            return;
        }
        if (addedLower && numElements % 2 == 0){
            medianNode = getPrev(medianNode);
            return;
        }
        if (!addedLower && numElements % 2 == 1){
            medianNode = getNext(medianNode);
        }
    }
    
    // get the inorder succesor
    private Node getNext(Node curr){
        if (curr.right != null){
            curr = curr.right;
            while (curr.left != null){
                curr = curr.left;
            }
            return curr;
        } else {
            Node parent = curr.parent;
            while (parent != null && parent.left != curr){
                curr = parent;
                parent = curr.parent;
            }
            return parent;
        }
        
    }
    
    // get the inorder predecessor
    private Node getPrev(Node curr){
        if (curr.left != null){
            curr = curr.left;
            while (curr.right != null){
                curr = curr.right;
            }
            return curr;
        } else {
            Node parent = curr.parent;
            while (parent != null && parent.right != curr){
                curr = parent;
                parent = curr.parent;
            }
            return parent;
        }
    }
};

// Your MedianFinder object will be instantiated and called as such:
// MedianFinder mf = new MedianFinder();
// mf.addNum(1);
// mf.findMedian();
 */