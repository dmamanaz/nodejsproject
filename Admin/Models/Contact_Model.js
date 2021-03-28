const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactModel = new Schema({
    Contact_Name: {type:String},
    Contact_Email: {type:String},
    Contact_Message: {type:String},
    Contact_Time: {type:Number}
})

module.exports = mongoose.model('contactus', ContactModel, 'contactus_list')