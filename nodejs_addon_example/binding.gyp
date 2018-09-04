{
    "targets": [
        {
            "target_name": "addon",
            "sources": ["TreeDemo.cpp"],
            "dependencies": ["BinaryTree"]
        },
        {
            "target_name": "BinaryTree",
            "sources": ["BinaryTree.cpp"],
            "type": "static_library"
        }
    ]
}