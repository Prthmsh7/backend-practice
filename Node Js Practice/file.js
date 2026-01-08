const fs = require('fs'); //built in

//To WRITE A FILE
//sync means that this was a synchronous call . . . 
// fs.writeFileSync('./test.txt','Hey World');


//This is the Async
// fs.writeFile('./test.txt','Hey World',(err)=>{});

// TO READ A FILE
// sync
const result = fs.readFileSync("./test.txt","utf-8");
console.log(result);