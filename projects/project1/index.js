const express = require ('express')
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

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

app.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({status:"pending"});
})
.delete((req,res)=>{
    return res.json({status:"pending"});
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

app.post('/api/users',(req,res)=>{
    // Create new user
    return res.json({status: "pending"});
});

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})