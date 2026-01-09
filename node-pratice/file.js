const fs = require('fs'); //built in

//To WRITE A FILE
//sync means that this was a synchronous call . . . 
// fs.writeFileSync('./test.txt','Hey World');


//This is the Async
// fs.writeFile('./test.txt','Hey World',(err)=>{});

// TO READ A FILE
// sync
// const result = fs.readFileSync("./test.txt","utf-8");
// console.log(result);

// async
// fs.readFile("./test.txt","utf-8",(err,result)=>{
//     if(err){
//          console.log("error",err);
//     }
//     else {
//         console.log(result);
//     }
// });

// //to append a file
// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

// To Copy one file's content into another file
fs.cpSync("./test.txt","./copy.txt");

const copied_text = fs.readFileSync("./copy.txt","utf-8");
console.log(copied_text);

// to delete a file 
fs.unlinkSync("./copy.txt");

console.log(fs.statSync("./test.txt"));