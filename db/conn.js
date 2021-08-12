const mongoose = require('mongoose');

// DataBase Connection
mongoose.connect( process.env.Db, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
    
}).then(() => {
    console.log("[ User Database Connected... ]");
}).catch((e) => {
    console.log("[ User Database Connection Error! ]");
})