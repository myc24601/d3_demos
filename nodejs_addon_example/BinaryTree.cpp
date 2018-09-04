#include "BinaryTree.hpp"

#include <cassert>
#include <fstream>
#include <string>

namespace demo {
BinaryTreeNode* IntBinaryTreeFactory::createNode(int val)
{
    BinaryTreeNode* node = new BinaryTreeNode(val);
    mNodes.push_back(node);
    return node;
}

void IntBinaryTreeFactory::clearAllNodes()
{
    for (auto node : mNodes) {
        delete node;
    }
}

BinaryTreeNode* IntBinaryTreeFactory::createDemoTree()
{
    int max_val = 7;
    for (size_t idx = 1; idx <= max_val; idx++) {
        createNode(idx);
    }
    
    // Iterate through the node list and make connections
    assert(mNodes.size() == max_val);
    for (size_t idx = 0; idx < mNodes.size(); ++idx) {
        size_t left_idx = idx * 2 + 1;
        size_t right_idx = idx * 2 + 2;

        if (left_idx < mNodes.size()) {
            mNodes[idx]->mLeft = mNodes[left_idx];
        }
        if (right_idx < mNodes.size()) {
            mNodes[idx]->mRight = mNodes[right_idx];
        }
    }
    
    return mNodes[0];
}

void IntBinaryTreeFactory::dumpAsJSON(BinaryTreeNode* root)
{
    std::ostringstream oss;
    dumpNodeAsJSON(root, 1, oss);
    std::ofstream outFile;
    outFile.open("demo_tree.json");
    outFile << oss.str();
    outFile.close();
}

/*
 *  A node would be represented as:
 *  {
 *     name: nodeName
 *     children: [ list of children]
 *  }
 */
void IntBinaryTreeFactory::dumpNodeAsJSON(BinaryTreeNode *node,
                                          size_t indentSize,
                                          std::ostringstream &oss) const
{   
    std::string indents(indentSize, ' ');
    size_t indentOffset = 4;
    size_t childIndent = indentSize + indentOffset;

    // Handle dummy node
    if (node == nullptr) {
        std::string name = "\"dummy\"";
        oss << indents << "{\n"
            << indents << "   \"name\": " << name << ",\n"
            << indents << "   \"children\": []\n"
            << indents << "}";
        return;
    }
    std::string name = std::to_string(node->mVal);
    oss << indents << "{\n";
    oss << indents << "   \"name\": " << "\"" << name << "\"" << ",\n";
    oss << indents << "   \"children\":\n";
    oss << indents << "   [\n";
    dumpNodeAsJSON(node->mLeft, childIndent, oss);
    oss << ",\n";
    dumpNodeAsJSON(node->mRight, childIndent, oss);
    oss << "\n";
    oss << indents << "   ]\n";
    oss << indents << "}";
}

} // namespace demo
