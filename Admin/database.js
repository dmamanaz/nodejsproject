const mongoose = require('mongoose');

// mongpdb atlas database name : db_media
const mongodb_url = "mongodb://127.0.0.1:27017/edureka_name"

mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
})