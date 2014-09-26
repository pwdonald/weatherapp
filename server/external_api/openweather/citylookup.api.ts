/// <reference path="../../typings/tsd.d.ts" />

import request = require('request');
import https = require('https');
import PromiseStatic = require('es6-promise');
import qs = require('querystring');
import utils = require('../../utils/utils');
import OpenWeatherApi = require('./openweather.api');
import model = require('./models/cityresults.model');

class CityLookupApi extends OpenWeatherApi {
    lookupCity = (apiToken: string, cityName: string, cityState?: string, cityCountry?: string): Thenable<model.CityResults> => {
        var qStr = {
            q: cityName + (cityState && cityState.length > 0 ? ', ' + cityState : '')
                + (cityCountry && cityCountry.length > 0 ? ', ' + cityCountry : '')
        };

        return this.get('find', qStr, apiToken);
    };
}

export = CityLookupApi;
