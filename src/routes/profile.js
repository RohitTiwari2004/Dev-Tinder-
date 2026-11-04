const express = require('express');
const  {userAuth} = require('../middlewares/auth.js');    
const User = require('../models/user');
const {validateProfileData} = require('../utils/validation.js');
const profileRoute = express.Router();

profileRoute.get("/profile/view", userAuth, async(req,res)=>
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

profileRoute.patch('/profile/edit', userAuth, async(req,res)=>
{

  try
  {
       if(!validateProfileData(req))
       {
        throw new Error("Invalid Edit Request");
       }

       const loggedInUser = req.user;
       console.log(loggedInUser);
       Object.keys(req.body).forEach(key=>(loggedInUser[key]= req.body[key]))
       await loggedInUser.save();
       return res.status(200).json({
        message: "Profile updated successfully"
       })
  }
  catch(err)
  {
    res.status(400).json({
      message: err.message,
    })
  }
})


module.exports = profileRoute;