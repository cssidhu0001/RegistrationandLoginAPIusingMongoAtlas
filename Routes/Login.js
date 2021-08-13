const express = require('express');
const router=express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
require('../middleware/auth');
const User = require('../models/signup');


router.use(cookieParser());
router.use(express.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/check.html'));
});

router.post('/', async(req,res)=>{
    try { 
        // console.log("Inside Temp");
        
        const temp = await User.findOne({email:req.body.email});
        // console.log(temp);
        const isMatched = await bcrypt.compare(req.body.password,temp.password);
        // console.log(isMatched);
        if (temp.email === req.body.email && isMatched){
            const token = await temp.generateAuthToken();
            res.cookie("jwt", token, {
                httpOnly:true
            });
            res.status(201).send("Login Successfully");    
        } else {
            res.status(201).send("Invalid Credentials...Please Try Again!!");                   
        }
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports= router;