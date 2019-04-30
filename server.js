'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

// setting up our port to listen for the GET
const PORT = process.env.PORT || 3000;

console.log(process.env.POTATO);

app.use(express.static('./public'));

app.get( '/test', (req, res) => {
  res.send('got it');
});

app.get('/weather', (req, res) => {
  try{
    let weatherData = require('./data/darksky.json');
    console.log(weatherData);
    console.log(weatherData[6]);
    console.log(weatherData[6][2]);
    // let weatherObj = new Weather(weatherData);
    res.send(weatherData);
  } catch ( err ){
    console.log('there was an error');
    res.status(500).send('server down');
  }
});

app.get('/location', (req, res) => {
  try{
    let locationData = require('./data/geo.json');
    console.log('this is passing', locationData);
    let locationObj = new Location(locationData);
    console.log(` ${locationObj}locationObj is passing`);
    res.send(locationObj);
  } catch ( err ){
    console.log('there was an error');
    res.status(500).send('server down');
  }
});

// let allWeatherInstance = [];

// function Weather(data) {
//   this.forecast = data[6][2].summary;
//   this.time = new Date(data[6][1].time).toDateString();
//   allWeatherInstance.push(this);
// }

let geoLocation = [];

function Location(data) {
  this.search_querry = data.results.address_components.long_name;
  this.formatted_querry = data.results.formatted_address;
  this.latitude = data.results.geometry.location.lat;
  this.longitude = data.results.geometry.location.lng;
  geoLocation.push(this);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

