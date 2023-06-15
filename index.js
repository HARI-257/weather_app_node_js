const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res) =>{
  res.sendFile(__dirname+'/index.html')
  
  })

app.post('/',(req,res)=> {
  const query = req.body.cityName
  const apikey = 'f00f7e19d8b14528ca11ab4cd04dfa6f'
  const unit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query+'&appid='+ apikey+'&units='+ unit
  https.get(url, (response) =>{
    console.log(response.statusCode);

    response.on('data',(data)=>{
      const weatherData = JSON.parse(data);
      console.log(weatherData.statusCode);

      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      console.log(icon);
      const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write('<p>Weather is currently '+desc+'</p>')
      res.write('<h1>The temperature in '+query +' is '+temp+' degree celsius</h1>')
      res.write("<img src=" + imageUrl +">")
      res.send()

    })
})
})




app.listen(3000,()=>{
  console.log("Server is running on 3000");
})






// const object = {
//   name:'hari',
//   fav:'obito',
// }
// console.log(JSON.stringify(object));
