require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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
        }
    }]
});

//middleware
userSchema.methods.generateAuthToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token}); 
        await this.save();
        return token;
    } catch (error) {
            res.status(500).send("yaha wala error");        
    }
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        this.confirmpassword = await bcrypt.hash(this.password,10);
    }
    next();
});

//collection
const User = new mongoose.model("User", userSchema);
module.exports = User;