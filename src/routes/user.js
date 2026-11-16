const express = require('express');

const userRouter = express.Router();

const {userAuth} = require('../middlewares/auth');

userRouter.get('/user/requests', userAuth, async(req,res)=>
{
    try{
        const loggedInUser = req.user;
    }
    catch(err)
    {
      return res.status(404).json({
        message: err.message
      });
    }

})



module.exports = userRouter;