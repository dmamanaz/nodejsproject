const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ContactUsModel = new Schema(
{
    Contact_name:{type:String},
    Contact_email:{type:String},
    Contact_message:{type:String},
    Contact_time:{type:String}
    
})
module.exports = mongoose.model("Contactus", ContactUsModel,"Contactus_List")