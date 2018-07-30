var root = createBinaryTreeSimple(8);
var tree = new BinaryTree(root);

var d3Hier = tree.toD3Format();
var jsonStr = JSON.stringify(d3Hier);
visualizeTree(d3Hier);