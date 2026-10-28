const express = require('express');
const app = express();
const connectDB = require('./config/db');
const User = require('./models/user');
const {validateSignupData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser =  require('cookie-parser')
const jwt = require('jsonwebtoken');

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid)
    {
      //Create a JWT Token 
      const token = await jwt.sign({_id: user._id}, "@DevTinder$2027");
      console.log(token);
      // Add the token to cookie and send the response
      res.cookie("token", token);
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

app.get("/profile", async(req,res)=>
{
  const cookies = req.cookies; // gets the cookies sent by the browser.
  const {token} = cookies;  // extracts the jwt token so you can validate.
  //Validating the token ..
  const decodedMessage = await jwt.verify(token,"@DevTinder$2027");
  const {_id} = decodedMessage;
  console.log("The logged in User is " + _id);
  console.log(decodedMessage);
  console.log(cookies);
  res.send("Reading cookie");
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
app.patch("/user/:userId", async(req,res)=>
{
  const userId = req.params?.userId;
  const data = req.body;
  
  try
  {
    const ALLOWED_UPDATES = ["userId","photoUrl", "about", "gender", "age", "skills" ];
  
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
  
    if(!isUpdateAllowed)
    {
      throw new Error("Update not allowed ");
    }
    
        if(data?.skills.length > 10)
        {
          throw new Error("Skills cannot be more than 10")
        }
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
