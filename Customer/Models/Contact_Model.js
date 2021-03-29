const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ContactUsModel = new Schema(
{
    Contact_email:{type:String},
    Contact_message:{type:String},
})
module.exports = mongoose.model("Contactus", ContactUsModel,"edureka_contacts")

