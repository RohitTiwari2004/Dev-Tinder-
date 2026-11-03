const express = require('express');

const {validateSignupData} = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRouter = express.Router();


authRouter.post("/signup", async(req,res)=>
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



})

authRouter.post('/login', async(req,res)=>
{
  try
  {

    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user)
    {
      throw new Error("Email Id is not present in db");
    }

    const isPasswordValid = await user.validatePassword(password);
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

authRouter.post('/logout',async(req,res)=>{
  res.cookie("token", null,{
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully");
})
module.exports = authRouter;