// this file is the entry point of our server
const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();
app.get('/',(req,res)=>{
    return res.send("Hello from express");
})


// This is a http server completely written from scratch in Node
// Express Js does the exact same thing for us
// It basically writes the entire myHandler Function for us
function MyHandler(req,res)=>{
    if(req.url==="/favicon.ico") return res.end();
    const log = `${Date.now()}:${req.method} ${req.url} New Request Received \n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("log.txt",log,(err,data)=>{
        
        switch(myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case "/signup":
                if(req.method==="GET") res.end('This is a signup form');
                else if(req.method==="POST") res.end("Success");
            default:
                res.end("404 Not Found");
    };
});

}
const myServer = http.createServer(MyHandler);
myServer.listen(8000,()=> console.log("Server Started"));

