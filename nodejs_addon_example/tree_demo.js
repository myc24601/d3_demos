const http = require("http");
const fs = require("fs");
const addon = require("./build/Release/addon");

/*
const obj1 = addon("hello");
const obj2 = addon("world");
console.log(obj1.msg, obj2.msg);
*/
addon.createDemoTree();


http.createServer(function (req, res) {
    var fileName = req.url.slice(1, req.url.length);
    if (fileName) {
        fs.readFile(fileName, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
    } });
}).listen(8000);

// console.log(addon.hello());
