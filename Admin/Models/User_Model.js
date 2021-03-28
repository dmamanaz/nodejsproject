const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema({
    name: {type:String},
    email: {type:String},
    password: {type:String}
})

module.exports = mongoose.model('user', UserModel, 'user_list')