const express = require('express');
const app = express();
const db = require('./database');
const Routes = require('./Routes/AdminRouter')
app.use('/Admin', Routes.router)
let user = Routes.user;
let newslist = Routes.newslist;
module.exports = {app , user, newslist};