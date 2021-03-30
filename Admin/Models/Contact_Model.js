const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactModel = new Schema({
    Contact_Email: {type:String},
    Contact_Message: {type:String},
})

module.exports = mongoose.model('contactus', ContactModel, 'edureka_contacts')