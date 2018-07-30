class TreeNode {
    constructor(name, parent = null, left = null, right = null) {
        if (!name) {
            console.error("node name must be specified.");
        }

        if (!parent) {
            parent = null;
        }

        this.name = name;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    // Add node as the left child as the current node.
    // If the current node already has a left child, or node already
    // has a parent, do not add and return false.
    // addRight follow a similar treatment.
    addLeft(node) {
        if (this.left != null ||
            node.parent != null) {
            return false;
        }

        node.parent = this;
        this.left = node;
        return true;
    }

    addRight(node) {
        if (this.right != null ||
            node.parent != null) {
            return false;
        }

        node.parent = this;
        this.right = node;
        return true;
    }
}

// A simple wrapper around a root node.
// The tree node structure is supposed to be fully constructed before creating
// the BinaryTree object.
class BinaryTree {
    constructor(root) {
        if (!root) {
            console.error("cannot create BinaryTree with a null root")
        }
        this.root = root;
    }

    // Convert the hierarchical tree structure to a JSON object
    toD3Format() {
        return treeNode2D3Node(this.root);

        function treeNode2D3Node(node) {
            if (!node) {
                // null check should handled by caller
                console.error("treeNode2D3Node can't handle null");
            }

            let d3Obj = {"name": node.name};
            var leftChildNode, rightChildNode;
            if (node.left != null) {
                leftChildNode = treeNode2D3Node(node.left);
            }

            if (node.right != null) {
                rightChildNode = treeNode2D3Node(node.right);
            }

            if (!leftChildNode && !rightChildNode) {
                return d3Obj;
            }
            else {
                if (!leftChildNode) {
                    leftChildNode = {"name": "dummy"};
                }
                if (!rightChildNode) {
                    rightChildNode = {"name": "dummy"};
                }
                d3Obj.children = [leftChildNode, rightChildNode];
                return d3Obj;
            }
        }
    }
}

function createBinaryTreeSimple(numNodes) {
    var nodeArray = new Array(numNodes);
    for (let idx = 1; idx <= numNodes; ++idx) {
        nodeArray[idx-1] = new TreeNode('' + idx);
    }

    // Set up hierarchical connections
    for (let idx = 1; idx <= numNodes; ++idx) {
        let currNode = nodeArray[idx-1];
        let leftChildIdx = idx * 2,
            rightChildIdx = leftChildIdx + 1;

        if (leftChildIdx <= numNodes) {
            let added = currNode.addLeft(nodeArray[leftChildIdx-1]);
            if (!added) {
                console.error("something went wrong when constructing left child");
            }
        }

        if (rightChildIdx <= numNodes) {
            let added = currNode.addRight(nodeArray[rightChildIdx-1]);
            if (!added) {
                console.error("something went wrong when constructing right child");
            }
        }
    }
    return nodeArray[0];
}