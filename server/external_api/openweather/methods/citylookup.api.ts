/// <reference path="../../../_references.ts" />

import OpenWeatherApi = require('./openweather.api');

class CityLookupApi extends OpenWeatherApi {
    lookupCityByName (apiToken: string, cityName: string, cityState?: string, cityCountry?: string): Thenable<ICityResults> {
        var query = {
            q: cityName + (cityState && cityState.length > 0 ? ', ' + cityState : '')
                + (cityCountry && cityCountry.length > 0 ? ', ' + cityCountry : '')
        };

        return this.get('find', query, apiToken);
    }

    lookupCityByCoordinates (apiToken: string, cityLon: number, cityLat: number): Thenable<ICityResults> {
        var query = {
            lat: cityLat,
            lon: cityLon
        };

        return this.get('find', query, apiToken);
    }
}

export = CityLookupApi;
