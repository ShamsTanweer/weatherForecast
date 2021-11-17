
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
});





app.post("/", function(req, res){



    const query = req.body.CityName
const apikey = "56b9cf140bcd6586c24359c7216f3ed5"
const unit = "metric"


const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey+""

https.get(url, function (response){
    


    response.on("data", function (data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp
       const WeatherDescription = weatherData.weather[0].description
       const cName = weatherData.name
       const icon = weatherData.weather[0].icon
       const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

       
       res.write("<h1>The temperature in " +cName  +" is "+ temp + " degrees celcius.</h1>");
       res.write("<h2>The weather is currently " + WeatherDescription + "</h2>");
       res.write("<img src="+imageurl+">")
       res.send();
    });


});


    console.log(req.body.CityName);
    
});









let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function(){
    console.log("Server has started successfully on port 3000");
});