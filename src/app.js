const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cookieParser =  require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

// app.post("/signup", async(req,res)=>
// {

    
//   try
//   {
//     //Validation of data
//     validateSignupData(req);
    
//     const {firstName, lastName, emailId, password} = req.body;
    
//     //encrypted hashed password
//     const passwordHash = await bcrypt.hash(password, 10);
//     const user = new User({
//       firstName,
//       lastName, 
//       emailId,
//       password: passwordHash,
//     });
  

//     await user.save();
//     res.send("User added successfully");

//   }catch(err)
//   {
//     res.status(400).send("Error:" + err.message);
//   }
//   // console.log(req.body);
//   // res.status(200).json({
//   //   message: "User successfully added into the system"
//   // })
// //   //creating new instance of the User model
// //   const user = new User({
// //     firstName: "Rohit",
// //     lastName: "Tiwari",
// //     emailId: "rohittiwari@tmail.com",
// //     password: "Rohit@123",
// //     age: "22",
// //     gender: "male"


// //   });

// //   try{
// //  await user.save();
// //  res.send("User added successfully");
// //   }catch(err)
// //   {
// //     res.status(400).json({
// //       message: err.message
// //     })
// //   }
// })




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
