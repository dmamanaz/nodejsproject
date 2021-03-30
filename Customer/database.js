
const mongoose = require('mongoose');
//database name and connection number 
const mongodb_url = "mongodb://127.0.0.1:27017/edureka_proejct"
mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connecting to the database for edureka_data")
    }).catch((err) => {
        console.log("Not connected to the database ", err);
})