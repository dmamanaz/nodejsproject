const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./Scratch');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../Models/User_Model');
const Newslist = require('../Models/News_Model')
const app = express();
app.set('view engine', 'ejs');
app.set('views', './Views');