 const jwt = require('jsonwebtoken');
 const User = require('../models/user');
 const userAuth = async(req, res, next)=>
 {
    try{
    //Read the token from the req cookies
    const cookies = req.cookies;

     const {token} = cookies;
    //validate the token
    const decodedMessage = await jwt.verify(token, "@DevTinder$2027");

    const {_id} = decodedMessage;
    const user = await User.findById(_id);
    if(!user)
    {
        res.send("User not found")
    }
    req.user = user;
    next();
}catch(err)
{
    res.status(404).json({
        message: err.message
    })
}
 };

 module.exports = {
    userAuth
 }