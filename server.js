require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const port = process.env.PORT;

require("./db/conn");
require('./middleware/auth');
const User = require('./models/signup');

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/signup', async(req,res)=>{
    try { 
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

app.get('/signin',(req,res)=>{
    res.sendFile(path.join(__dirname+'/check.html'));
});

app.post('/signin', async(req,res)=>{
    try {
        const temp = await User.findOne({email:req.body.email});
        const isMatched = await bcrypt.compare(req.body.password,temp.password);
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

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});