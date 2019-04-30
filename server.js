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
    let weatherObj = new Weather(weatherData);
    console.log(weatherObj);
    res.send(weatherObj);
  } catch ( err ){
    console.log('there was an error');
    res.status(500).send('server down');
  }
});

app.get('/location', (req, res) => {
  try{
    let locationData = require('./data/geo.json');
    res.send(locationData);
  } catch ( err ){
    console.log('there was an error');
    res.status(500).send('server down');
  }
});

let allWeatherInstance = [];

function Weather(data) {
  this.forecast = data[6][2].summary;
  this.time = new Date(data[6][1].time).toDateString();
  allWeatherInstance.push(this);
}

let geoPosition = [];

function Position(search, format, lat, long) {
  this.search_querry = search;
  this.formatted_querry = format;
  this.latitude = lat;
  this.longitude = long;
  geoPosition.push(this);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

