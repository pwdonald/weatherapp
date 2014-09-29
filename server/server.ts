/// <reference path="./_references.ts" />

import express = require('express');
import config = require('./config/config');
import configureDb = require('./db/connection');
import configureExpress = require('./config/express');
import openweatherapi = require('./external_api/openweather/openweathermapapi');

configureDb();

var app = express(),
    weatherapi = new openweatherapi(),
    currentweather = weatherapi.CurrentWeather;

configureExpress(app);

var server = app.listen(config.port, () => {
    console.log('Listening on address %d.', server.address().port);
    currentweather.getWeatherByCityName(config.weatherapi, 'Birmingham, AL').then((weather) => {
        console.log(weather);
    });
});

export = app;
