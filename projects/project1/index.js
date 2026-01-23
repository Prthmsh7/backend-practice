const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//Connecting the mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/dummy-app")
.then(()=>{console.log("mongoDB connected")})
.catch((err)=>console.log("mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }},
  {timestamps : true}
)

const User = mongoose.model('user',userSchema);


//Middleware - Think of this as a plugin
app.use(express.urlencoded({ extended: false }));

// Creating a Middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.method}:${req.path}`,
    (err, data) => {
      next();
    },
  );

  // To end the response here only without calling the next function
  // return res.json({msg:"Hello from middleware 1"})
  next();
});

// REST API

// Server side rendering example
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// Client side rendering
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Prathmesh Shukla"); // We created a custom Header
  // It's a good practice to append X in front of the name of your custom header
  return res.json(users);
});

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

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    // When Local DB
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);

    // When using mongoDB
    const user = await User.findByID(req.params.id);
    if(!user) return res.status(404).json({msg:"No User Found"});
    return res.json(user);
  })
  .patch(async(req, res) => {
    // for local db
    // const id = Number(req.params.id);
    // const body = req.body;
    // const userIndex = users.findIndex((u) => u.id === id);
    // if (userIndex === -1) {
    //   return res.status(404).json({ status: "fail" });
    // }
    // users[userIndex] = {
    //   ...users[userIndex],
    //   ...body,
    // };
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "success", id: users.length });
    // });

    // when using mongoDB
    const user = await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"});
    return res.json({ status: "success" });
  })
  .delete(async(req, res) => {
    // for local db
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((u) => u.id === id);
    // if (userIndex === -1) {
    //   return res.status(404).json({ status: "fail" });
    // }
    // users.splice(userIndex, 1);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //   if (err) {
    //     return res.status(500).json({ status: "error" });
    //   }
    //   return res.json({ status: "success" });
    // });

    // When using mongoDB
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  // When we used a local setup of a json database
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res
  //     .status(201)
  //     .json({ status: "success, ", user: users[userIndex] });
  // });

  // When we added a MongoDB 
  const result = await User.create({
    firtName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result",result)
  return res.status(201).json({msg:"success"};)
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
