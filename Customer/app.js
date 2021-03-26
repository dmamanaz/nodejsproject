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
const NewsList = require('./Models/News_model')
const Contactus_List = require('./Models/Contact_Model')
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
//Function to get the get the weather user data
const getWeatherData = async (Lon, Lat) =>{
    //nEED THE API KEY(PLEASE RESOLVE)
    const key = "371e3350e42ff3618e3c67c091326f57";
    const Url = `http://api.openweathermap.org/data/2.5/weather?lon=${Lon}&lat=${Lat}&appid=${key}&units=metric`
    console.log("getWeather : apiUrl : ", Url)
    try{
        //use axios to connect said api
        return await axios.get(Url)
    }catch(err){
        console.log(err)
    }
}


app.get('/', (req,res)=>{

    getUserLoc().then((loc)=>{  
        const Lon = loc.longitude
        const Lat = loc.latitude
        console.log(`lon: ${Lon}, lat: ${Lat}`)
        //Get the weathe  data as well 
        getWeatherData(Lon,Lat).then((res)=>{
            const weather = {
                Description: res.data.weather[0].main,
                Icon: "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png",
                Temperature: res.data.main.temp,
                Temp_min: res.data.main.temp_min,
                Temp_max: res.data.main.temp_max,
                City: res.data.name
            }
            console.log("weather: ", weather)
            //get the top 3 data for the news list for the insert time 
            NewsList.find({}).limit(3).sort( {insertTime: -1} ).exec( (err,data)=>{
                if(err)
                    console.error(err);
                else
                {
                    console.log("news : ", data)
                    res.render('Home.ejs', {
                        weather,
                        data
                    })
                }
            })
    
        })
    })
})




//Create the server for the chat rooms 
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log("Creating the server chat rooms " + app.get('port'));
});
const io = require('socket.io').listen(server);