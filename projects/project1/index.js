const express = require ('express')
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

//Middleware - Think of this as a plugin
app.use(express.urlencoded({ extended:false}))

// Creating a Middleware
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now()}:${req.method}:${req.path}`, (err,data)=>{
        next();
    });

    // To end the response here only without calling the next function
    // return res.json({msg:"Hello from middleware 1"})
    next();
})


// REST API

// Server side rendering example
app.get('/users',(req,res)=>{
    const html = `
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

// Client side rendering
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

// We merged and groupedthese in the above step using .route
// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(user=>user.id===id);
//     return res.json(user);
// });

// app.patch('/api/users/:id',(req,res)=>{
//     // Edit the user with id
//     return res.json({status: "pending"});
// });

// app.delete('/api/users/:id',(req,res)=>{
//     // Delete the user with id
//     return res.json({status: "pending"});
// });

app.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})
.patch((req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex(u => u.id === id);
    if(userIndex === -1){
        return res.status(404).json({status:"fail"});
    }
    users[userIndex] = {
    ...users[userIndex],
    ...body
    };
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length})
    })
})
.delete((req,res)=>{
  
    const id = Number(req.params.id);
    const userIndex = users.findIndex(u=>u.id===id);
    if(userIndex=== -1){
        return res.status(404).json({status:"fail"});
    }
    users.splice(userIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error" });
        }
        return res.json({ status: "success" });
    });
})


app.post('/api/users',(req,res)=>{
    // Create new user
    const body = req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success, ",user: users[userIndex]})
    })
});

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})