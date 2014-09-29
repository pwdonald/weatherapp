/// <reference path="../../../_references.ts" />

import OpenWeatherApi = require('./openweather.api');
import utils = require('../../../utils/utils');

class ForecastApi extends OpenWeatherApi {
    getForecastByCityName (apiToken: string, cityName: string, days?: number) {
        var term = 'forecast',
            query: any = {
                q: cityName
            };

        if (utils.isNumber(days)) {
            term = 'forecast/daily';
            query.cnt = days;
        }

        return this.get(term, query, apiToken);
    }

    getForecastByCityId(apiToken: string, cityId: string, days?: number) {
        var term = 'forecast',
            query: any = {
                id: cityId
            };

        if (utils.isNumber(days)) {
            term = 'forecast/daily';
            query.cnt = days;
        }

        return this.get(term, query, apiToken);
    }

    getForecastByCoordinates(apiToken: string, cityLon: number, cityLat: number, days?: number) {
        var term = 'forecast',
            query: any = {
                lat: cityLat,
                lon: cityLon
            };

        if (utils.isNumber(days)) {
            term = 'forecast/daily';
            query.cnt = days;
        }

        return this.get(term, query, apiToken);
    }
}

export = ForecastApi;
