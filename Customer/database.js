require('dotenv').config()
const mongoose = require('mongoose');
//database name and connection number 
const mongodb_url = process.env.MongoDB_Atlas;
mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connecting to the database")
    }).catch((err) => {
        console.log("Not connected to the database ", err);
})