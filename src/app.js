const express = require('express');
const app = express();
const connectDB = require('./config/db');
const User = require('./models/user');

app.use(express.json());
app.post("/signup", async(req,res)=>
{


  const user = new User(req.body);
  try
  {
    await user.save();
    res.send("User added successfully");

  }catch(err)
  {
    res.status(400).send("Error saving the user:" + err.message);
  }
  // console.log(req.body);
  // res.status(200).json({
  //   message: "User successfully added into the system"
  // })
//   //creating new instance of the User model
//   const user = new User({
//     firstName: "Rohit",
//     lastName: "Tiwari",
//     emailId: "rohittiwari@tmail.com",
//     password: "Rohit@123",
//     age: "22",
//     gender: "male"


//   });

//   try{
//  await user.save();
//  res.send("User added successfully");
//   }catch(err)
//   {
//     res.status(400).json({
//       message: err.message
//     })
//   }
})


//Get user by email
app.get("/user", async(req,res)=>
{
  const userEmail = req.body.emailId;
  try
  {
    const user = await User.find({emailId: userEmail});
    if(!user.length)
      {
       return res.status(409).json({
          message: "User email does not exists"
        });
      }
      return res.send(user);

  }catch(err)
  {
      res.status(400).json({
        message: err.message 
      });
  }
})
//Feed API - GET/feed - get all the users from the database
app.get("/feed", async(req,res)=>
{
  try
  {
        const users = await User.find({});
        return res.send(users);
  }
  catch(err)
  {
         return res.status(400).json({
          message: err.message
         })
  }

})

app.delete("/user", async(req,res)=>
{
  const userId = req.body.userId;
  try
  {
        //const user = await User.findByIdAndDelete({_id: userId});
        //shorthand for this , we donot have to use _id in findByIdAndDelete
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
  }
  catch(err)
  {
       return res.status(500).json({
        message: err.message
       });
  }
})

//Updating the data of user...
app.patch("/user", async(req,res)=>
{
  const userId = req.body.userId;
  const data = req.body;
  try
  {
    await User.findByIdAndUpdate({_id: userId},data, {returnDocument: "after", runValidators: true})
    res.send("user data updated successfully");
  }
  catch(err)
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
