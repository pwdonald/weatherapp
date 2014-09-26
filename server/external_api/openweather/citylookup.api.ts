/// <reference path="../../typings/tsd.d.ts" />

import OpenWeatherApi = require('./openweather.api');
import model = require('./models/cityresults.model');

class CityLookupApi extends OpenWeatherApi {
    lookupCityByName = (apiToken: string, cityName: string, cityState?: string, cityCountry?: string): Thenable<model.CityResults> => {
        var query = {
            q: cityName + (cityState && cityState.length > 0 ? ', ' + cityState : '')
                + (cityCountry && cityCountry.length > 0 ? ', ' + cityCountry : '')
        };

        return this.get('find', query, apiToken);
    };

    lookupCityByCoords = (apiToken: string, cityLon: number, cityLat: number): Thenable<model.CityResults> => {
        var query = {
            lat: cityLat,
            lon: cityLon
        };

        return this.get('find', query, apiToken);
    };
}

export = CityLookupApi;
