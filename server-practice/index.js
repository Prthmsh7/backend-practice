// this file is the entry point of our server
const http = require('http');
const myServer = http.createServer((req,res)=>{
    console.log("New Request Recieved");
    res.end("Hello This is my Server");
});

myServer.listen(8000,()=> console.log("Server Started"));

