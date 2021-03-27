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
//The NewList//ContactUSList
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
        //Get the weather  data as well 
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
app.get('/sports',(req,res)=>
{
    const apiUrl = 'https://newsapi.org/v2/top-headlines'
    //include the todays_date
    const todays_date = new Date().toISOString().substring(0,10);
    axios.get(apiUrl,{

        params:{
            sources:'espn, nfl-news, the-sports-bible',
            from: todays_date,
            sortBy:'Popularity',
            language:'en',
            apiKey:'884aeb5b9df34b4080592935e05a5417'
            
        }
    }).then((res) =>
    {
        const data = res.data.articles;
        res.render('Sport.ejs',data);
    }).catch(function(err)
    {
        console.log(err);
    })
    
})
app.get('/about_us', (req,res)=>{
    res.render('about_us.ejs')
})
app.get('/contact_us', (req,res)=>{
    res.render('contact_us.ejs', {
        msg: req.query.msg?req.query.msg:''
    })
})
app.post('/addContactUs', (req,res)=>{
    console.log("/addContactUs : req.body : ", req.body)
    
    const record = req.body
    Contactus_List.create(
            record  
        , (err, data) => {
            if(err){
                const htmlMsg = encodeURIComponent('Error : ', error);
                res.redirect('/contact_us/?msg=' + htmlMsg)
            }else{
                const htmlMsg = encodeURIComponent('ContactUs Message Saved OK !');
                res.redirect('/contact_us/?msg=' + htmlMsg)
            }
        }) 
    
})



//Create the server for the chat rooms 
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log("Creating the server chat rooms " + app.get('port'));
});
//Create the io
const io = require('socket.io').listen(server);
//list of users for the chat room 
const list_of_users = [];
io.on('connection',(socket) =>
{
    //Uppon connection 
    socket.on('connect',()=>
    {
        console.log("New connection formed: ", socket.id);
    })
    //Disconnect the user that wants to disconnect. Keep the other ones in check. Filter the poeple who want to be  left pver
    socket.on('disconnect',()=>
    {
        console.log("Disconnecting user: ", socket.nickname);
        const user_left_over = list_of_users.filter(user => user != socket.nickname);
        list_of_users= user_left_over;
        io.emit('userlist', list_of_users);
    })
    //Create of a new alias.
    socket.on('alias', (nickname)=>
    {
        console.log("Alias Formed: " , nickname);
        socket.nickname = nickname;
        list_of_users.push(socket.nickname);
        io.emit('userlist',list_of_users);
    })
    //The event associated when the users wants to create a message
    socket.on('chat',(data) =>
    {
        const  time_stamp = new Date().toLocaleString();
        const generated_response = `${time_stamp} : ${socket.nickname} : ${data.message}`
        io.emit('chat',generated_response);
    })
});