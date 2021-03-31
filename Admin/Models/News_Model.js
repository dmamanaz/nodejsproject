const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsModel = new Schema({
    News_title: {type:String},
    News_description: {type:String},
    News_url: {type:String},
    News_urlToImage: {type:String},
    News_publishedAt: {type:Date},
    News_insertTime: {type:Date}
})

module.exports = mongoose.model('newslist', NewsModel, 'edureka_data')