const express = require('express');

const userRouter = express.Router();

const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

userRouter.get('/user/requests/received', userAuth, async(req,res)=>
{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
          toUserId: loggedInUser._id,
          status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"]) ;
        return res.json({message: "Data fetched successfully", data: connectionRequests});
    }
    catch(err)
    {
      return res.status(404).json({
        message: err.message
      });
    }

})

userRouter.get("/user/connections", userAuth, async(req,res)=>
{
   try
   {
       const loggedInUser = req.user;

       const connectionRequests = await ConnectionRequest.find({
        $or:[
          {toUserId: loggedInUser._id, status: "accepted"},
          {
            fromUserId: loggedInUser._id, status: "accepted"
          },
        ]
       }).populate("fromUserId", ["firstName", "lastName"]);
       
      //  const data = connectionRequests.map((row)=>
      // {

      // })

       return res.status(404).json({
        data: connectionRequests
       })
   }
   catch(err)
   {
    return res.status(400).send({
      message: err.message+ "No connection requests"
    });
   }
})

module.exports = userRouter;