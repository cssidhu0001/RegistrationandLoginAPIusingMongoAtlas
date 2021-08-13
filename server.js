require('dotenv').config();
require("./db/conn");
const express = require('express');
const app = express();
const port = process.env.PORT;
require('./middleware/auth');

const login = require('./Routes/Login');
const register = require('./Routes/register');

app.use("/signin",login)
app.use("/",register)


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})


