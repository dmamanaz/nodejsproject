import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import cors from 'cors'
import path from 'path'
import http from 'http'
import iplocate from 'node-iplocate'
import publicIp from 'public-ip'
//execute the call back functions 
require('./database')
//The NewList//CONTACUSLIST
const Newslist = require('./Models/News_model')
const Contactuslist = require('./Models/Contact_Model')
const app = express()
//Set the enviroment port
app.set('port', process.env.PORT || 7080);
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
//Srt the view engine and find where the 
app.set('view engine', 'ejs')
app.set('views', './Views')

//Simple await call back function to get the userLocatioN
const getUserLoc = async ()=>{
    try{
        //GET THE IP ITSELF
        const ip = await publicIp.v4()
        console.log("ip : ", ip)
        return await iplocate(ip)    
    }catch(err){
        console.log(err)
    }
}



//Create the server for the chat rooms 
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log("Creating the server chat rooms " + app.get('port'));
});
const io = require('socket.io').listen(server);