/// <reference path="../../../_references.ts" />

import OpenWeatherApi = require('./openweather.api');

class CurrentWeatherApi extends OpenWeatherApi {
    getWeatherByCityName (apiToken: string, cityName: string): Thenable<ICurrentWeather> {
        var query = {
            q: cityName
        };

        return this.get('weather', query, apiToken);
    }

    getWeatherByCoordinates (apiToken: string, lat: number, lon: number): Thenable<ICurrentWeather> {
        var query = {
            lat: lat,
            lon: lon
        };

        return this.get('weather', query, apiToken);
    }

    getWeatherByCityId (apiToken: string, cityId: number): Thenable<ICurrentWeather> {
        var query = {
            id: cityId
        };

        return this.get('weather', query, apiToken);
    }
}

export = CurrentWeatherApi;
