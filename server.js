const express = require('express');
const app = express();
const path = require('path');
const bcrypt= require('bcrypt');
const port = process.env.PORT || 5000;

require("./db/conn");
const User = require('./models/signup');

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/signup', async(req,res)=>{
    try { 
                
        const passwordTobeHashed=req.body.password;
        const hashedpassword = await bcrypt.hash(passwordTobeHashed,10);
        
        const confirmpassPasswordtoBeHashed=req.body.confirmpassword;
        const hashedconfirmpassword = await bcrypt.hash(confirmpassPasswordtoBeHashed,10);

        if (passwordTobeHashed===confirmpassPasswordtoBeHashed){
            const newuser = new User({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                address:req.body.address,
                password:hashedpassword,
                confirmpassword:hashedconfirmpassword
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