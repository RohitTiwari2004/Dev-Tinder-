const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        required: true,
        maxLength: 50


    },
    lastName:
    {
        type: String
    },
    emailId: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        trim: true
    },
    password:{
        type: String
    },
    age:
    {
        type: Number,
        min: 18
    },
    gender:
    {
        type: String,
        validate(value)
        {
            if(!["male", "female", "others"].includes(value))
            {
                throw new Error("Gender data is not valid");
                
            }
        }
    },
    photoUrl:
    {
        type: String,
         default: "https://www.volunteersummernepal.org/blog/learn-basic-nepali-language" 
    },
    about: 
    {
        type: String,
        default: "This is a default about of the user !!",
    },
    skills:
    {
        type: [String]
    }
});
 
module.exports = mongoose.model('User', userSchema);

