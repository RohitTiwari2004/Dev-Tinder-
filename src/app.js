const express = require('express');
const app = express();


 app.use("/user",(req,res,next)=>
 {
   //Route Handler
   next();    //If you call next() then it will go to the next router handler
   res.send('User route handler');

 },(req,res, next)=>
 {
    res.send('Admin Route Handler')
   next()
 },
 (req,res,next)=>
 {
   next();
   res.send("Handling 3rd Route");
 })
app.listen(3000, () => {
  console.log('Server is running and started on port 3000');
});
