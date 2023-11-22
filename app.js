const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const cors = require('cors')
const axios = require('axios');
require('dotenv').config();

// Define routes

app.use(cors({credentials: true,origin: "*"}));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/data/short', (req, res) => {
    var lat = parseFloat(req.query.lat)
    var long = parseFloat(req.query.long)
    console.log(lat)
    console.log(long)
    const currentDate = new Date();
    console.log(currentDate)
    const formattedDate = currentDate.toISOString().slice(0, 10);
    console.log(formattedDate)
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 5);
    const formattedFutureDate = futureDate.toISOString().slice(0, 10);
    console.log(formattedFutureDate)
    let data = JSON.stringify({
      "lat": lat,
      "lon": long,
      "date_interval": {
        "start": formattedDate,
        "end": formattedFutureDate
      }
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://b2b.ignitia.se/api/iskaplusbr-mvp/forecast',
      headers: { 
        'auth-key': process.env.AUTH_KEY_SHORT, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
    
});

app.get('/api/data/long', (req, res) => {
    console.log("here")
    
    var lat = parseFloat(req.query.lat)
    var long = parseFloat(req.query.long)
    console.log(lat)
    console.log(long)
    let data = JSON.stringify({
        "lat": 5.65178,
        "lon": 5
    });

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://b2b.ignitia.se/api/ocp/forecast/longrange',
    headers: { 
        'auth-key': process.env.AUTH_KEY_LONG, 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    res.status(200).json(JSON.stringify(response.data))
    })
    .catch((error) => {
        console.log(error);
    });

})


app.get('/api/data/spray',(req,res)=>{
  var lat = parseFloat(req.query.lat)
  var long = parseFloat(req.query.long)
  console.log(lat)
  console.log(long)

  let data = JSON.stringify({
    "lat": 5.65178,
    "lon": 5
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://b2b.ignitia.se/api/spraying-advisory',
    headers: { 
      'auth-key': process.env.AUTH_KEY_SPRAY, 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.status(200).json(JSON.stringify(response.data))
  })
  .catch((error) => {
    console.log(error);

  });

})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});