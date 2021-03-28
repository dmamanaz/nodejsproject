const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsModel = new Schema({
    News_title: {type:String},
    News_description: {type:String},
    News_url: {type:String},
    News_urlToImage: {type:String},
    News_publishedAt: {type:String},
    News_insertTime: {type:Number}
})

module.exports = mongoose.model('newslist', NewsModel, 'news_list')