require('dotenv').config()
const mongoose = require("mongoose");
const jwt =require('jsonwebtoken')
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
    },  
    tokens:[{
        token:{
            type:String,
            required:true
        }}
    ]
});


userSchema.methods.generateAuthToken= async function(){
    try {
        const genratedtoken=jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:genratedtoken})
   await this.save();
        return genratedtoken;
    } catch (error) {

        console.log(error);
    }
}

//collection
const User = new mongoose.model("User", userSchema);
module.exports = User;