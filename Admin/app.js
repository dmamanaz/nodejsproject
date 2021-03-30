const express = require('express');
const app = express();
const db = require('./database');
const Routes = require('./Routes/AdminRouter')
app.use('/Admin', Routes)
module.exports = app;