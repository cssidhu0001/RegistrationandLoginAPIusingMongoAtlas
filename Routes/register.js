const express = require('express');
const router=express.Router();
const User = require('../models/signup');
const path = require('path');
const cookieParser = require('cookie-parser');
require('../middleware/auth');

router.use(cookieParser());
router.use(express.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    console.log("Inside Register ");
    res.sendFile(path.join(__dirname+'/index.html'));
});


router.post('/signup', async(req,res)=>{
    try { 
        // console.log("Inside SignUP");
            const newuser = new User({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                address:req.body.address,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            });
            if (newuser.password===newuser.confirmpassword){
                //middleware
                const token = await newuser.generateAuthToken();
                res.cookie("jwt", token, {
                    httpOnly:true
                });
                await newuser.save();
                res.status(201).send("Sign Up Sucessfull!! _ Login into Account !!");
                
            } else {
               res.status(400).send("Password not Matched !!! Try Again !!!!!")
        }
    } catch (error) {
        res.status(400).send("<h1>Server error</h1> or account already exists with the phone no. or email.<br/>"+error);
    }
});



module.exports= router;