const express = require("express");
const app = express();
const weather = require('openweather-apis');



const API_KEY = '0c273a9af104f75e3283ab76e83f77fc';
weather.setAPPID(API_KEY);
weather.setLang('en');
weather.setUnits('metric');


app.set('trust proxy', true);

app.listen(4000, ()=>{
    console.log("listening");
})

app.get("/api/hello", async(req, res)=>{
const {visitor_name}=req.query;
if(visitor_name){
const clientip= req.ip
//'102.216.201.31'

fetch(`http://ip-api.com/json/${clientip}`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
weather.setCity(data.city);
weather.getAllWeather((err, JSONObj) => {
    if (err) {
        console.error('Error fetching weather data:', err);
        return res.status(500).send('Error fetching weather data');
    }

    const temperature = JSONObj.main.temp;
    const weatherDescription = JSONObj.weather[0].description;
    res.send({
        "client_ip": clientip,
  "location": data.city,
  "greeting": `Hello, ${visitor_name}!, the temperature is ${temperature}degrees Celcius in ${data.city} `
    })
});

})
}
else{res.send("invalid query string. use this instead:  visitor_name='mark'")}

})
