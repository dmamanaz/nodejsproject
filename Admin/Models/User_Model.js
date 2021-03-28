const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema({
    User_Name: {type:String},
    User_Email: {type:String},
    User_Password: {type:String}
})

module.exports = mongoose.model('user', UserModel, 'user_list')