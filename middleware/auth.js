require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/signup");


const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        // console.log('JWT Token'+token);
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY); 

        const user = await User.findOne({_id:verifyUser._id});
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send("Token generating error");
    }
};

module.exports = auth;