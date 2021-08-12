const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone: {    
        required:true,
        unique:true,
        type:Number

    },
    address: {
        type:String,
        required:true
    },
    email: {
        unique:true,
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    }
});

//collection
const User = new mongoose.model("User", userSchema);
module.exports = User;