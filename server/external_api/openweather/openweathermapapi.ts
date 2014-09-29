/// <reference path="../../_references.ts" />

import citylookup = require('./methods/citylookup.api');
import currentweather = require('./methods/currentweather.api');
import forecast = require('./methods/forecast.api');

class OpenWeatherMapApi {
    CityLookup = new citylookup();
    CurrentWeather = new currentweather();
    Forecast = new forecast();
}

export = OpenWeatherMapApi;
