const express = require('express');
const app = express();
const connectDB = require('./config/db');
const User = require('./models/user');


app.post("/signup", async(req,res)=>
{
  //creating new instance of the User model
  const user = new User({
    firstName: "Rohit",
    lastName: "Tiwari",
    emailId: "rohittiwari@tmail.com",
    password: "Rohit@123",
    age: "22",
    gender: "male"


  });

  try{
 await user.save();
 res.send("User added successfully");
  }catch(err)
  {
    res.status(400).json({
      message: err.message
    })
  }
})

connectDB().then(()=>
{
    console.log("Database has been connected successfully");
    app.listen(3000, () => {
      console.log('Server is running and started on port 3000');
    });
})
.catch((err)=>
{
    console.log(err.message);
})
