#include <node.h>

#include "BinaryTree.hpp"

namespace demo {
using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

void CreateDemoTree(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() != 0) {
        // Throw an error that is passed back to JavaScript
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    IntBinaryTreeFactory treeFac{};
    BinaryTreeNode* root = treeFac.createDemoTree();
    treeFac.dumpAsJSON(root);

    Local<Object> obj = Object::New(isolate);
    args.GetReturnValue().Set(obj);
}

void Init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "createDemoTree", CreateDemoTree);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init);

} // namespace demo