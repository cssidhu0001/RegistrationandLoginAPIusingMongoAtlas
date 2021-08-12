const mongoose = require('mongoose');

// DataBase Connection
const Dbserver= "mongodb+srv://charan:Userdb123@cluster0.ocp8t.mongodb.net/UserDb?retryWrites=true&w=majority"
mongoose.connect( Dbserver, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
    
}).then(() => {
    console.log("[ User Database Connected... ]");
}).catch((e) => {
    console.log("[ User Database Connection Error! ]");
})