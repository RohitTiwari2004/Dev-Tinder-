const express = require('express');
const  {userAuth} = require('../middlewares/auth.js');    
const User = require('../models/user');

const profileRoute = express.Router();

profileRoute.get("/profile", userAuth, async(req,res)=>
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


module.exports = profileRoute;