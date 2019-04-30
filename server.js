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
    res.send(weatherData);
  } catch ( err ){
    console.log('there was an error');
    res.status(500).send('server down');
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

