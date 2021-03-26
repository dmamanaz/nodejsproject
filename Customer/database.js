
const mongoose = require('mongoose');
//database name and connection number 
const mongodb_url = "mongodb://127.0.0.1:27017/edureka_data"
mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connecting to the database")
    }).catch((err) => {
        console.log("Not connected to the database ", err);
})