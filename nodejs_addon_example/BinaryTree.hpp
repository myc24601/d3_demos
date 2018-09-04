// A minimal example of exposing binary tree as a node.js addon
#pragma once

#include <sstream>
#include <vector>

namespace demo {
class BinaryTreeNode
{
  private:
    friend class IntBinaryTreeFactory;
    // Make constructor private so users won't create nodes directly
    BinaryTreeNode(int val) : mVal(val), mLeft(nullptr), mRight(nullptr) {}

  public:
    int mVal;
    BinaryTreeNode *mLeft;
    BinaryTreeNode *mRight;
};

// 
class IntBinaryTreeFactory
{
  public:
    ~IntBinaryTreeFactory() { clearAllNodes(); }
    BinaryTreeNode* createNode(int val);
    void clearAllNodes(); // delete all tree nodes

    // Create a demo tree:
    //                     1
    //                /          \
    //               2            3
    //            /     \      /     \
    //           4       5    6       7
    BinaryTreeNode* createDemoTree();

    // Given a root node, dump the tree as to JSON
    void dumpAsJSON(BinaryTreeNode* root);

  private:
    void dumpNodeAsJSON(BinaryTreeNode *node,
                        size_t indentSize,
                        std::ostringstream &oss) const;

  private:
    std::vector<BinaryTreeNode *> mNodes;
};
} // namespace demo