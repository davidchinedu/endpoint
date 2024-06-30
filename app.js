const express = require("express");
const app = express();
const weather = require('openweather-apis');


const API_KEY = '0c273a9af104f75e3283ab76e83f77fc';
weather.setAPPID(API_KEY);
weather.setLang('en');
weather.setUnits('metric');

//const city = 'owerri'




app.set('trust proxy', true);

app.listen(4000, ()=>{
    console.log("listening");
})

app.get("/h",(req, res)=>{
const {visitor_name}=req.query;
if(visitor_name == "mark"){
const clientip=req.ip
fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=${clientip}`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
 //console.log(data)
weather.setCity(data);
weather.getAllWeather((err, JSONObj) => {
    if (err) {
        console.error('Error fetching weather data:', err);
        return res.status(500).send('Error fetching weather data');
    }

    const temperature = JSONObj.main.temp;
    const weatherDescription = JSONObj.weather[0].description;
    res.send({
        "client_ip": clientip,
  "location": data,
  "greeting": `Hello, ${visitor_name}!, the temperature is ${temperature}degrees Celcius in ${data}`
    })
});

})
}
else{res.send("invalid query string. use this instead:  visitor_name='mark'")}

})
//0c273a9af104f75e3283ab76e83f77fc
//    /api/hello?visitor_name="Mark"