// http server using Node + Express

// const http = require('http');
const express = require('express');

// This is a http server completely written from scratch in Node
// Express Js does the exact same thing for us
// It basically writes the entire myHandler Function for us
// function MyHandler(req,res)=>{
//     if(req.url==="/favicon.ico") return res.end();
//     const log = `${Date.now()}:${req.method} ${req.url} New Request Received \n`;
//     const myUrl = url.parse(req.url,true);
//     console.log(myUrl);
//     fs.appendFile("log.txt",log,(err,data)=>{
        
//         switch(myUrl.pathname){
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi, ${username}`);
//                 break;
//             case "/signup":
//                 if(req.method==="GET") res.end('This is a signup form');
//                 else if(req.method==="POST") res.end("Success");
//             default:
//                 res.end("404 Not Found");
//     };
// });
//}

const app = express();
app.get('/',(req,res)=>{
    return res.send("Hello from express");
})
app.get('/about',(req,res)=>{
    return res.send(`Hello, I'm ${req.query.name} and I'm ${req.query.age} years old`);
})
app.get('/signup',(req,res)=>{
    return res.send("Our apps signup form");
})

//Express says that I'm already doing this much, lemme completely do the entire thing
// const myServer = http.createServer(app);
// myServer.listen(8000,()=> console.log("Server Started"));

app.listen(8000,()=> console.log("Server Started"));