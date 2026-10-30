const express = require('express');
const app = express();
const connectDB = require('./config/db');
const User = require('./models/user');
const {validateSignupData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser =  require('cookie-parser')
const jwt = require('jsonwebtoken');
const {userAuth } = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async(req,res)=>
{

    
  try
  {
    //Validation of data
    validateSignupData(req);
    
    const {firstName, lastName, emailId, password} = req.body;
    
    //encrypted hashed password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName, 
      emailId,
      password: passwordHash,
    });
  

    await user.save();
    res.send("User added successfully");

  }catch(err)
  {
    res.status(400).send("Error:" + err.message);
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

app.post('/login', async(req,res)=>
{
  try
  {

    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user)
    {
      throw new Error("Email Id is not present in db");
    }

    const isPasswordValid = await user.validatePassword(passwordEnterByUser);
    if(isPasswordValid)
    {
      const token = await user.getJWT();
      // Add the token to cookie and send the response
      res.cookie("token", token, {httpOnly: true});
      res.send("Login Successful !!");
    }
    else
    {
      throw new Error("Password is not correct");
  
    }
  }catch(err)
  {
    res.status(400).json({
      message: err.message
    });
  }
});

app.get("/profile", userAuth, async(req,res)=>
{
  try{

  
  // console.log(decodedMessage);
  // console.log(cookies);

  const user = req.user;
  res.send(user);
  }catch(err)
  {
      res.status(400).json({
        message: err.message,
      })
  }
})

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
  console.log("Connection request");
  res.send("Connection request sent");
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
